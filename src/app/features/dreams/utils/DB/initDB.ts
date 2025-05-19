import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            status VARCHAR(20) CHECK (status IN ('admin', 'super_user', 'regular_user')) NOT NULL DEFAULT 'regular_user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            is_active BOOLEAN DEFAULT TRUE
        );
        `;

    // Create files table
    await sql`
        CREATE TABLE IF NOT EXISTS files (
            file_id SERIAL PRIMARY KEY,
            unique_id VARCHAR(36) NOT NULL UNIQUE,
            file_name VARCHAR(255) NOT NULL,
            file_url VARCHAR(512) NOT NULL,
            file_size BIGINT NOT NULL,
            file_type VARCHAR(100),
            created_by INTEGER NOT NULL REFERENCES users(user_id),
            is_private BOOLEAN DEFAULT FALSE,
            allowed_users JSONB DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_viewed TIMESTAMP NULL,
            view_count INTEGER DEFAULT 0,
            last_viewed_by INTEGER REFERENCES users(user_id),
            properties JSONB DEFAULT '{}'::jsonb
        );
        `;

    // Create indexes
    await sql`
        CREATE INDEX IF NOT EXISTS idx_files_created_by ON files(created_by);
        CREATE INDEX IF NOT EXISTS idx_files_is_private ON files(is_private);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
