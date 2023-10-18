import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('build'));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
