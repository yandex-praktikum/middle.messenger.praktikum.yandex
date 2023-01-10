// server.js
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("./dist/"));

// app.use("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/index.html"));
// });

app.listen(PORT, function () {
  console.log(`Приложение запущено http://localhost:${PORT}`);
});
