import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { User, UserStatus } from './types';

const sql = neon(process.env.DATABASE_URL!);

export async function createUser(userData: User) {
  try {
    const result = await sql`
      INSERT INTO users (
        status, 
        email, 
        dreamsWatched, 
        last_login, 
        is_active
      )
      VALUES (
        ${userData.status || 'user'},
        ${userData.email},
        ${userData.dreamsWatched || JSON.stringify([])},
        ${userData.last_login || null},
        ${userData.is_active !== undefined ? userData.is_active : true}
      )
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserById(userId: number) {
  try {
    const result = await sql`
      SELECT * FROM users 
      WHERE id = ${userId}
    `;
    return result[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await sql`
      SELECT * FROM users 
      WHERE email = ${email}
    `;
    return result[0];
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const result = await sql`
      SELECT * FROM users
    `;
    return result;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}

export async function updateUser(userId: number, updateData: User) {
  try {
    const result = await sql`
      UPDATE users
      SET 
        status = ${updateData.status},
        email = ${updateData.email},
        dreamsWatched = ${updateData.dreamsWatched},
        last_login = ${updateData.last_login},
        is_active = ${updateData.is_active}
      WHERE id = ${userId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function updateLastLoginUserToNow(userId: number) {
  try {
    const result = await sql`
      UPDATE users
      SET 
        last_login = ${new Date()}
      WHERE id = ${userId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function changeUserStatus(userId: number, status: UserStatus) {
  try {
    const result = await sql`
      UPDATE users
      SET 
        status = ${status}
      WHERE id = ${userId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(userId: number) {
  try {
    const result = await sql`
      DELETE FROM users
      WHERE id = ${userId}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error('Error deleting user:', error);
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

// export async function getUserWatchedDreams(userId: number): Promise<Dream[]> {
//   try {
//     const user = await getUserById(userId);
//     if (!user) throw new Error('User not found');

//     const watchedDreamIds: number[] = JSON.parse(user.dreamsWatched || '[]');
//     if (watchedDreamIds.length === 0) return [];

//     const result = await sql`
//       SELECT * FROM dreams
//       WHERE id = ANY(${sql.array(watchedDreamIds, 'int4')})
//     `;

//     return result;
//   } catch (error) {
//     console.error('Error getting user watched dreams:', error);
//     throw error;
//   }
// }
