const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL
    }
));
app.use(express.json());
const router = require("./router");

// Mount the API routes under the "/api" endpoint
app.use("/", router);

module.exports = app;


/*
DB_HOST=localhost
DB_PORT=3306
DB_USER=sharmake
DB_PASSWORD=143letsetfashion
DB_NAME=bibliotheque

PORT=3000
FRONTEND_URL=http://localhost:3000

*/




/* index.js checkpoint4

// Load environment variables from .env file
require("dotenv").config();

// Import the Express application from src/app.js
const app = require("./src/app");

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });


// .env checkpoint4

# Application Configuration
APP_PORT=3310
APP_SECRET=kdkdkdkdjhgfjghg445555rur2f5f6f6f6f6f6ff6fdjdgddgdg

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=sharmake
DB_PASSWORD=143letsetfashion
DB_NAME=checkpoint4

# Frontend URL (for CORS configuration)
FRONTEND_URL=http://localhost:3000



*/