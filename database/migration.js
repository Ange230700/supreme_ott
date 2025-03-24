// database/migration.js

import dotenv from "dotenv";
dotenv.config();

import fs from "node:fs";
import mysql from "mysql2/promise";

// Create a URL for the schema.sql file relative to this module.
// If schema.sql is in the same folder as migration.js, use "./schema.sql"
const schemaUrl = new URL("./schema.sql", import.meta.url);

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file.
    const sql = fs.readFileSync(schemaUrl, "utf8");

    // Create a connection to the database.
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Drop the existing database if it exists.
    await database.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);

    // Create a new database with the specified name.
    await database.query(`CREATE DATABASE ${DB_NAME}`);

    // Switch to the newly created database.
    await database.query(`USE ${DB_NAME}`);

    // Execute the SQL statements to update the database schema.
    await database.query(sql);

    // Close the database connection.
    await database.end();

    console.info(`${DB_NAME} updated from ${schemaUrl.pathname} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

migrate();
