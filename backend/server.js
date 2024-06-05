require("dotenv").config();

const app = require("./src/app.js")

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.info(`the server is listening on ${port}`);
  })
  .on("error", (err) => {
    console.error("error", err.message);
  });
