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
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lastLogin TIMESTAMP NULL,
            isActive BOOLEAN DEFAULT TRUE

        );
        `;

    await sql`
  CREATE TABLE IF NOT EXISTS dreams(
    id SERIAL,
    name TEXT NOT NULL,
    createdTime DATE NOT NULL,
    modifiedTime DATE NOT NULL,
    lastUpdatedTime DATE NOT NULL,
    fileId TEXT NOT NULL UNIQUE,
    size BIGINT NOT NULL,
    webContentLink TEXT NOT NULL,
    playableUrl TEXT NOT NULL,
    isPrivate BOOLEAN NOT NULL
);
        `;
    //   await sql`
    // CREATE TABLE IF NOT EXISTS invitations(
    //   id SERIAL PRIMARY KEY,
    //   token TEXT NOT NULL UNIQUE,
    //   created_by INTEGER REFERENCES users(id),
    //   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //   expires_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '7 days') STORED,
    //   used BOOLEAN DEFAULT FALSE,
    // );
    // `;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function dropTables() {
  try {
    await sql`DROP TABLE IF EXISTS dreams`;
    await sql`DROP TABLE IF EXISTS users`;
    await sql`DROP TABLE IF EXISTS invitations`;

    console.log('Database dropped successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
export async function dropDreamsTable() {
  try {
    await sql`DROP TABLE IF EXISTS dreams`;

    console.log('dreams dropped successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
