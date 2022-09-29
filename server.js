const express = require("express");
const port = 3000;
const app = express();

app.use(express.static(__dirname + "/dist"));

app.listen(port, () => {
  console.log(`Приложение слушает порт: ${port}`);
});
