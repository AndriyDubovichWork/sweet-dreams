import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import type { Dream } from './types';
import { getUserById } from './userCrud';
import getFiles from '@/app/api/dream/drive/getFiles';
import type { OrderByValues } from '../store/types/savedDreamsStore';

const sql = neon(process.env.DATABASE_URL!);

export async function createDream(dreamData: Omit<Dream, 'id'>) {
  console.log(dreamData);
  try {
    const result = await sql`
      INSERT INTO dreams (
        name, 
        created_time, 
        modified_time, 
        last_updated_time, 
        file_id, 
        size, 
        web_content_link, 
        playable_url, 
        is_private
      )
      VALUES (
        ${dreamData.name},
        ${dreamData.created_time || new Date()},
        ${dreamData.modified_time || new Date()},
        ${dreamData.last_updated_time || new Date()},
        ${dreamData.file_id},
        ${dreamData.size},
        ${dreamData.web_content_link},
        ${dreamData.playable_url},
        ${dreamData.is_private || false}
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

export async function getAllDreams(sortBy: OrderByValues = 'name') {
  try {
    const result = await sql`
          SELECT * FROM dreams
          ORDER BY ${sql.unsafe(sortBy)}
        `;
    return result;
  } catch (error) {
    console.error('Error getting all dreams:', error);
    throw error;
  }
}
export async function searchDreamsByName(
  sortBy: OrderByValues = 'name',
  name: string
) {
  console.log('sortBy:', sortBy);

  try {
    const result = await sql`
      SELECT * FROM dreams
      WHERE name ILIKE ${'%' + name + '%'}
      ORDER BY ${sql.unsafe(sortBy)} 
      `;
    return result;
  } catch (error) {
    console.error('Error getting all dreams:', error);
    throw error;
  }
}
// check this
export function findDuplicateDreams(
  DBdreams: any[],
  checkFields: string[] = ['file_id']
): any {
  const results: any = {};

  checkFields.forEach((file_id) => {
    const fieldMap: any = new Map<string, any[]>();

    DBdreams.forEach((dream) => {
      const fieldValue = dream[file_id]?.toString().toLowerCase().trim();
      if (!fieldValue) return;

      if (!fieldMap.has(fieldValue)) {
        fieldMap.set(fieldValue, []);
      }
      fieldMap.get(fieldValue).push(dream);
    });

    results[file_id] = [];
    fieldMap.forEach((items: any, value: any) => {
      if (items.length > 1) {
        results[file_id].push({
          file_id,
          value,
          count: items.length,
          items,
        });
      }
    });
  });

  return results;
}
// check this
export async function copyAllDreamsFromDriveToDB(): Promise<{
  created: number;
  skipped: number;
  errors: number;
}> {
  try {
    const DBdreams = await getAllDreams();
    const existingIds = new Set(
      DBdreams.map((d) => {
        const id = d.file_id?.toLowerCase().trim();
        return id;
      }).filter(Boolean)
    );

    // 2. Get Drive files
    const driveResponse = await getFiles('created_time', 1000);
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
          file_id: driveDream.id,
          size: Number(driveDream.size),
          created_time: new Date(driveDream.createdTime || Date.now()),
          modified_time: new Date(
            driveDream.modifiedTime || driveDream.createdTime || Date.now()
          ),
          last_updated_time: new Date(),
          web_content_link: `https://drive.google.com/uc?id=${driveDream.id}&export=download`,
          playable_url: `https://drive.google.com/file/d/${driveDream.id}/preview`,
          is_private: driveDream.name.includes('/private/'),
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
    const duplicates = findDuplicateDreams(allDreams, ['file_id']);
    const fileIdDuplicates = duplicates.file_id || [];

    let removed = 0;
    let errors = 0;

    // Process each group of duplicates
    for (const group of fileIdDuplicates) {
      // Keep the first dream (oldest by ID or creation time) and remove the rest
      const dreamsToKeep = group.items
        .sort(
          (a: Dream, b: Dream) =>
            (a.id || 0) - (b.id || 0) ||
            new Date(a.created_time).getTime() -
              new Date(b.created_time).getTime()
        )
        .slice(0, 1);

      const dreamsToRemove = group.items.filter(
        (dream: Dream) => !dreamsToKeep.some((k: Dream) => k.id === dream.id)
      );
      // Remove duplicates
      for (const dream of dreamsToRemove) {
        try {
          await deleteDream(dream.file_id);
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
      WHERE is_private = false
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
        created_time = ${updateData.created_time || new Date()},
        modified_time = ${updateData.modified_time || new Date()},
        last_updated_time = ${new Date()},
        file_id = ${updateData.file_id},
        size = ${updateData.size},
        web_content_link = ${updateData.web_content_link},
        playable_url = ${updateData.playable_url},
        is_private = ${updateData.is_private}
      WHERE id = ${dreamId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating dream:', error);
    throw error;
  }
}
export async function renameDream(dreamId: string, name: string) {
  try {
    const result = await sql`
      UPDATE dreams
      SET
        name = ${name}	
      WHERE file_id = ${dreamId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating dream:', error);
    throw error;
  }
}
export async function deleteDream(dreamId: string) {
  console.log('Deleting dream with file_id:', dreamId);
  try {
    const result = await sql`
      DELETE FROM dreams
      WHERE file_id = ${dreamId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error deleting dream:', error);
    throw error;
  }
}
