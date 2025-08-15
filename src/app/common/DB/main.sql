
CREATE TABLE IF NOT EXISTS "users"(
            "id" SERIAL PRIMARY KEY UNIQUE,
            "status"  VARCHAR(20) CHECK (status IN ('admin', 'super_user', 'user')) NOT NULL DEFAULT 'user',
            "email" TEXT NOT NULL UNIQUE,
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            "last_login" TIMESTAMP NULL,
            "is_active" BOOLEAN DEFAULT TRUE

);
CREATE TABLE IF NOT EXISTS "dreams"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_time" DATE NOT NULL,
    "modified_time" DATE NOT NULL,
    "last_updated_time" DATE NOT NULL,
    "file_id" TEXT NOT NULL UNIQUE,
    "size" BIGINT NOT NULL,
    "web_content_link" TEXT NOT NULL,
    "playable_url" TEXT NOT NULL,
    "is_private" BOOLEAN NOT NULL
);
 CREATE TABLE IF NOT EXISTS "invitations"(
      "id" SERIAL PRIMARY KEY,
      "token" TEXT NOT NULL UNIQUE,
      "used" BOOLEAN DEFAULT FALSE
      );


CREATE TABLE IF NOT EXISTS "watched_dreams"(
    "user_id" INT NOT NULL,
    "dream_id" TEXT NOT NULL UNIQUE,
    PRIMARY KEY ("user_id", "dream_id"),
    FOREIGN KEY ("user_id") REFERENCES users("id"),
    FOREIGN KEY ("dream_id") REFERENCES dreams("file_id")
);

DROP TABLE IF EXISTS "dreams"
DROP TABLE IF EXISTS "users"
DROP TABLE IF EXISTS "invitations"
DROP TABLE IF EXISTS "watched_dreams"
