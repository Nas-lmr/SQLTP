require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

const schema = path.join(__dirname, "database", "migrate.sql");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const mysql = require("mysql2/promise");

const migrate = async () => {
  try {
    const sql = fs.readFileSync(schema, "utf8");

    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    await database.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\``);
    await database.query(`CREATE DATABASE \`${DB_NAME}\``);
    await database.query(`USE \`${DB_NAME}\``);
    await database.query(sql);

    await database.end();

    console.info(`${DB_NAME} updated from ${schema} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

migrate();
