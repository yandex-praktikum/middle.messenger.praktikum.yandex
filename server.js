import path from 'path';
import express from 'express';

const app = express();
const PORT = 3000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './dist')));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});