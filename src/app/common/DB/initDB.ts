import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL,
            status  VARCHAR(20) CHECK (status IN ('admin', 'superUser', 'user')) NOT NULL DEFAULT 'user',
            email TEXT NOT NULL,
            dreamsWatched TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            is_active BOOLEAN DEFAULT TRUE

        );
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS dreams(
            id SERIAL,
            name TEXT NOT NULL,
            createdTime DATE NOT NULL,
            lastUpdatedTime DATE NOT NULL,
            fileId TEXT NOT NULL,
            size BIGINT NOT NULL,
            webContentLink TEXT NOT NULL,
            playableUrl TEXT NOT NULL,
            isPrivate BOOLEAN NOT NULL
        );
        `;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function dropTables() {
  try {
    await sql`DROP TABLE IF EXISTS dreams`;
    await sql`DROP TABLE IF EXISTS users`;

    console.log('Database dropped successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
