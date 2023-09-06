import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
