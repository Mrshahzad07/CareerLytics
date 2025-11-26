-- Create Database
CREATE DATABASE IF NOT EXISTS careerlytics;
USE careerlytics;

-- Create User Table (if not exists, though Hibernate handles this)
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert a test user (password: password)
-- Note: In a real app, passwords must be BCrypt encoded. This is just for manual testing if needed.
-- INSERT INTO user (full_name, email, password) VALUES ('Test User', 'test@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG');
