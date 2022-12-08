require("dotenv").config({ path: `process.env` });

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  console.log(`Сервер запущен...  http://localhost:${PORT}/`);
});
