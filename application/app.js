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
