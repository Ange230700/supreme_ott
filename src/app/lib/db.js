// src\app\lib\db.js

import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

console.info(`Connecting to database ${DB_NAME} on ${DB_HOST}:${DB_PORT}`);

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10,
});

pool.name = DB_NAME;

export default pool;
