CREATE TABLE IF NOT EXISTS `dreams`(
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
CREATE TABLE IF NOT EXISTS `users`(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status  VARCHAR(20) CHECK (status IN ('admin', 'super_user', 'regular_user')) NOT NULL DEFAULT 'regular_user',
    email LINESTRING NOT NULL,
    dreamsWatched TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE

);

DROP TABLE dreams
DROP TABLE users
