const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

app.use("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
