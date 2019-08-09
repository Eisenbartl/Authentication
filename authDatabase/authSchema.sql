-- DROP DATABASE IF EXISTS users;
-- CREATE DATABASE users;
-- USE users;

CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT,
    email TEXT,
    user_password TEXT
);