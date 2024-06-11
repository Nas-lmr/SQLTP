const express = require("express");
const cors = require("cors");
const app = express();

// middleware cors pour le front
app.use(cors());
// le middleware expressjson
app.use(express.json());

// import le router

const router = require("./router");

// app utilise cette chemin

app.use("/", router);

module.exports = app;
