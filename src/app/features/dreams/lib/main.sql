-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_status ENUM('admin', 'super_user', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Files table with all properties and permission information
CREATE TABLE IF NOT EXISTS files (
    file_id INT PRIMARY KEY AUTO_INCREMENT,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(512) NOT NULL UNIQUE,
    file_size BIGINT NOT NULL, -- in bytes
    file_type VARCHAR(100),
    uploader_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_viewed TIMESTAMP NULL,
    last_viewed_by INT NULL,
    view_count INT DEFAULT 0,
    allowed_users JSON DEFAULT NULL, -- Stores array of user_ids with access to this file
    properties JSON DEFAULT NULL, -- Stores additional custom properties
    
    FOREIGN KEY (uploader_id) REFERENCES users(user_id),
    FOREIGN KEY (last_viewed_by) REFERENCES users(user_id)
);