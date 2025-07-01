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
CREATE TABLE IF NOT EXISTS users(
            id SERIAL,
            status  VARCHAR(20) CHECK (status IN ('admin', 'superUser', 'user')) NOT NULL DEFAULT 'user',
            email TEXT NOT NULL,
            dreamsWatched TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lastLogin TIMESTAMP NULL,
            isActive BOOLEAN DEFAULT TRUE

        );


CREATE TABLE IF NOT EXISTS invitations(
             id SERIAL PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
    created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '7 days') STORED,
  used BOOLEAN DEFAULT FALSE,
 

        );



DROP TABLE IF EXISTS dreams
DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS invitations
