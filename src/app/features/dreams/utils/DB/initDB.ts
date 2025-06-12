import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS users(
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            status  VARCHAR(20) CHECK (status IN ('admin', 'super_user', 'regular_user')) NOT NULL DEFAULT 'regular_user',
            email LINESTRING NOT NULL,
            dreamsWatched TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            is_active BOOLEAN DEFAULT TRUE

        );
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS dreams(
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name LINESTRING NOT NULL,
            createdTime DATE NOT NULL,
            lastUpdatedTime DATE NOT NULL,
            fileId LINESTRING NOT NULL,
            size BIGINT NOT NULL,
            webContentLink LINESTRING NOT NULL,
            playableUrl LINESTRING NOT NULL,
            isPrivate BOOLEAN NOT NULL
        );
        `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function dropTables() {
  try {
    await sql`
        DROP TABLE dreams
        DROP TABLE users
        `;

    console.log('Database dropped successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
