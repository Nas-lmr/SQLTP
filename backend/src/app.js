const express = require("express");
const cors = require("cors");


const app = express();


// le middleware expressjson
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // keep this one, after checking the value in `backend/.env`
  optionsSuccessStatus: 200,
  credentials: true,
}));
// import le router

const router = require("./router");

// app utilise cette chemin

app.use("/api", router);

module.exports = app;
