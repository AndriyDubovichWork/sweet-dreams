CREATE TABLE IF NOT EXISTS dreams(
    id SERIAL,
    name TEXT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    lastUpdatedTime DATE NOT NULL,
    fileId TEXT NOT NULL,
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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            is_active BOOLEAN DEFAULT TRUE

        );

DROP TABLE IF EXISTS dreams
DROP TABLE IF EXISTS users
