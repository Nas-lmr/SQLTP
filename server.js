require("dotenv").config();

const dbpool = require("./database/client");
const express = require("express");

const app = express();
const PORT = process.env.APP_PORT

// connexion  à la base de données 
dbpool.getConnection()
  .then(connection => {
    console.info(`Connected to database ${dbpool.databaseName}`);
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('La connexion à la base de données a échoué.', error.message);
    process.exit(1); 
  });