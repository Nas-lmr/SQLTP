const mysql = require("mysql2/promise");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const client = mysql.createPool({
  host: DB_HOST,
  portdb:DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});



// Store database name into client for further uses
client.databaseName = DB_NAME;

// Ready to export
module.exports = client;
