const express = require("express");

const app = express();

// le middleware expressjson
app.use(express.json());

// import le router

const router = require("./router");

// app utilise cette chemin

app.use("/", router);

module.exports = app;
