import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { Dream } from './types';
import { getUserById } from './userCrud';
import getFiles from '@/app/api/dream/drive/getFiles';
import { OrderByValues } from '../../types/store/savedDreamsStore';

const sql = neon(process.env.DATABASE_URL!);

export async function createDream(dreamData: Omit<Dream, 'id'>) {
  try {
    const result = await sql`
      INSERT INTO dreams (
        name, 
        createdTime, 
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
    console.error('Error creating dream:', error);
    throw error;
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

type OrderBy = 'name' | 'created_at' | 'updated_at';
type Direction = 'ASC' | 'DESC';
export async function getAllDreams(sortBy = 'name', isReversed = false) {
  let localSortBy: OrderBy = 'name';
  const localDirection: Direction = isReversed ? 'DESC' : 'ASC';
  switch (sortBy) {
    case 'name':
      localSortBy = 'name';
      break;
    case 'createdTime':
      localSortBy = 'created_at';
      break;
    case 'modifiedTime':
      localSortBy = 'updated_at';
      break;
  }

  try {
    const result = await sql`
      SELECT * FROM dreams
      ORDER BY ${sql.unsafe(localSortBy)} ${sql.unsafe(localDirection)}
    `;
    return result;
  } catch (error) {
    console.error('Error getting all dreams:', error);
    throw error;
  }
}
export async function copyAllDreamsFromDriveToDB() {
  try {
    const driveDreams = await getFiles('createdTime', '', 1000).then(
      (res) => res.data.files
    );
    const DBdreams = await getAllDreams();

    // console.log('driveDreams', driveDreams);
    // console.log('DBdreams', DBdreams);

    driveDreams?.map((driveDream) => {
      // console.log('drive', driveDream.id);
      DBdreams.map((Dbdream) => {
        if (driveDream.id === Dbdream.fileid) {
          console.log('already exists');
        } else {
          createDream({
            createdTime: new Date(driveDream.createdTime as string),
            fileId: driveDream.id as string,
            isPrivate: driveDream.name?.includes('/private/') as boolean,
            lastUpdatedTime: new Date(),
            name: driveDream?.name?.replaceAll('/private/', '') as string,
            playableUrl: `https://drive.google.com/file/d/${driveDream.id}/preview`,
            webContentLink: `https://drive.google.com/uc?id=${driveDream.id}&export=download`,
            size: Number(driveDream.size),
          });
          console.log('coppied');
        }
      });
    });
  } catch (error) {
    console.error('Error getting all dreams:', error);
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

export async function updateDream(dreamId: number, updateData: Dream) {
  try {
    const result = await sql`
      UPDATE dreams
      SET 
        name = ${updateData.name},
        lastUpdatedTime = ${updateData.lastUpdatedTime || new Date()},
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
export async function deleteDream(dreamId: number) {
  try {
    const result = await sql`
      DELETE FROM dreams
      WHERE id = ${dreamId}
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

    const watchedDreams = JSON.parse(user.dreamsWatched || '[]');
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
