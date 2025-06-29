import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { Dream } from './types';
import { getUserById } from './userCrud';
import getFiles from '@/app/api/dream/drive/getFiles';
import {
  OrderByDirection,
  OrderByValues,
} from '../store/types/savedDreamsStore';
import { log } from 'console';

const sql = neon(process.env.DATABASE_URL!);

export async function createDream(dreamData: Omit<Dream, 'id'>) {
  try {
    const result = await sql`
      INSERT INTO dreams (
        name, 
        createdTime, 
        modifiedTime, 
        lastUpdatedTime, 
        fileId, 
        size, 
        webContentLink, 
        playableUrl, 
        isPrivate
      )
      VALUES (
        ${dreamData.name},
        ${dreamData.createdTime || new Date()},
        ${dreamData.modifiedTime || new Date()},
        ${dreamData.lastUpdatedTime || new Date()},
        ${dreamData.fileId},
        ${dreamData.size},
        ${dreamData.webContentLink},
        ${dreamData.playableUrl},
        ${dreamData.isPrivate || false}
      )
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === '23505') {
    } else {
      console.error('Error creating dream:', error);
      throw error;
    }
  }
}

export async function getDreamById(dreamId: number) {
  try {
    const result = await sql`
      SELECT * FROM dreams 
      WHERE id = ${dreamId}
    `;
    return result[0];
  } catch (error) {
    console.error('Error getting dream:', error);
    throw error;
  }
}

export async function getAllDreams(
  sortBy: OrderByValues = 'name',
  isReversed = false
) {
  const localDirection: OrderByDirection = isReversed ? 'DESC' : 'ASC';

  try {
    const result = await sql`
      SELECT * FROM dreams
      ORDER BY ${sql.unsafe(sortBy)} ${sql.unsafe(localDirection)}
    `;
    return result;
  } catch (error) {
    console.error('Error getting all dreams:', error);
    throw error;
  }
}

export function findDuplicateDreams(
  DBdreams: any[],
  checkFields: string[] = ['fileId']
): any {
  const results: any = {};

  checkFields.forEach((field) => {
    const fieldMap: any = new Map<string, any[]>();

    DBdreams.forEach((dream) => {
      const fieldValue = dream[field]?.toString().toLowerCase().trim();
      if (!fieldValue) return;

      if (!fieldMap.has(fieldValue)) {
        fieldMap.set(fieldValue, []);
      }
      fieldMap.get(fieldValue).push(dream);
    });

    results[field] = [];
    fieldMap.forEach((items: any, value: any) => {
      if (items.length > 1) {
        results[field].push({
          field,
          value,
          count: items.length,
          items,
        });
      }
    });
  });

  return results;
}

export async function copyAllDreamsFromDriveToDB(): Promise<{
  created: number;
  skipped: number;
  errors: number;
}> {
  try {
    const DBdreams = await getAllDreams();
    const existingIds = new Set(
      DBdreams.map((d) => {
        const id = d.fileid?.toLowerCase().trim();
        return id;
      }).filter(Boolean)
    );

    // 2. Get Drive files
    const driveResponse = await getFiles('createdTime', 1000);
    const driveDreams = driveResponse?.data?.files || [];

    let created = 0;
    let skipped = 0;
    let errors = 0;

    // 3. Process with validation
    for (const driveDream of driveDreams) {
      const driveId = driveDream.id?.toLowerCase().trim();

      if (!driveId) {
        skipped++;
        continue;
      }

      if (existingIds.has(driveId)) {
        skipped++;
        continue;
      }

      try {
        if (
          !driveDream.id ||
          !driveDream.name ||
          driveDream.size === undefined
        ) {
          throw new Error('Missing required fields');
        }

        const dreamData = {
          name: driveDream.name.replace('/private/', ''),
          fileId: driveDream.id,
          size: Number(driveDream.size),
          createdTime: new Date(driveDream.createdTime || Date.now()),
          modifiedTime: new Date(
            driveDream.modifiedTime || driveDream.createdTime || Date.now()
          ),
          lastUpdatedTime: new Date(),
          webContentLink: `https://drive.google.com/uc?id=${driveDream.id}&export=download`,
          playableUrl: `https://drive.google.com/file/d/${driveDream.id}/preview`,
          isPrivate: driveDream.name.includes('/private/'),
        };

        await createDream(dreamData);
        existingIds.add(driveId);
        created++;
      } catch (error) {
        errors++;
        console.error('Failed to create dream:', {
          id: driveDream.id,
          // Log the problematic dream for debugging
          dreamData: {
            id: driveDream.id,
            name: driveDream.name,
            size: driveDream.size,
            hasWebContent: !!driveDream.webContentLink,
          },
        });
      }
    }

    return { created, skipped, errors };
  } catch (error) {
    console.error('Critical error:', error);
    throw error;
  }
}

export async function removeDuplicateDreams(): Promise<{
  totalDuplicates: number;
  removed: number;
  errors: number;
}> {
  try {
    // Get all dreams from the database
    const allDreams = await getAllDreams();

    // Find duplicates by fileId
    const duplicates = findDuplicateDreams(allDreams, ['fileid']);
    const fileIdDuplicates = duplicates.fileid || [];

    let removed = 0;
    let errors = 0;

    // Process each group of duplicates
    for (const group of fileIdDuplicates) {
      // Keep the first dream (oldest by ID or creation time) and remove the rest
      const dreamsToKeep = group.items
        .sort(
          (a: Dream, b: Dream) =>
            (a.id || 0) - (b.id || 0) ||
            new Date(a.createdTime).getTime() -
              new Date(b.createdTime).getTime()
        )
        .slice(0, 1);

      const dreamsToRemove = group.items.filter(
        (dream: Dream) => !dreamsToKeep.some((k: Dream) => k.id === dream.id)
      );
      // Remove duplicates
      for (const dream of dreamsToRemove) {
        try {
          await deleteDream(dream.fileid);
          removed++;
        } catch (error) {
          errors++;
          console.error(`Error removing duplicate dream ${dream.id}:`, error);
        }
      }
    }

    return {
      totalDuplicates: fileIdDuplicates.reduce(
        (sum: number, group: any) => sum + group.count - 1,
        0
      ),
      removed,
      errors,
    };
  } catch (error) {
    console.error('Error in removeDuplicateDreams:', error);
    throw error;
  }
}

export async function getPublicDreams() {
  try {
    const result = await sql`
      SELECT * FROM dreams
      WHERE isPrivate = false
    `;
    return result;
  } catch (error) {
    console.error('Error getting public dreams:', error);
    throw error;
  }
}

export async function updateDream(dreamId: number, updateData: Partial<Dream>) {
  try {
    const result = await sql`
      UPDATE dreams
      SET 
        name = ${updateData.name},
        createdTime = ${updateData.createdTime || new Date()},
        modifiedTime = ${updateData.modifiedTime || new Date()},
        lastUpdatedTime = ${new Date()},
        fileId = ${updateData.fileId},
        size = ${updateData.size},
        webContentLink = ${updateData.webContentLink},
        playableUrl = ${updateData.playableUrl},
        isPrivate = ${updateData.isPrivate}
      WHERE id = ${dreamId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating dream:', error);
    throw error;
  }
}

export async function deleteDream(dreamId: string) {
  try {
    const result = await sql`
      DELETE FROM dreams
      WHERE fileId = ${dreamId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error deleting dream:', error);
    throw error;
  }
}

export async function addDreamToWatched(userId: number, dreamId: number) {
  try {
    const user = await getUserById(userId);
    if (!user) throw new Error('User not found');

    let watchedDreams: number[] = [];
    try {
      watchedDreams = user.dreamsWatched ? JSON.parse(user.dreamsWatched) : [];
    } catch (e) {
      watchedDreams = [];
    }

    if (!watchedDreams.includes(dreamId)) {
      watchedDreams.push(dreamId);
    }

    const result = await sql`
      UPDATE users
      SET dreamsWatched = ${JSON.stringify(watchedDreams)}
      WHERE id = ${userId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error adding dream to watched list:', error);
    throw error;
  }
}
