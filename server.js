import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.use(express.static(join(__dirname, 'dist')));

app.use('*', (req, res) => {
    res.sendFile('index.html', { root: join(__dirname, 'dist') });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
