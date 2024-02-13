import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import open from 'open';

const app = express();
const PORT = 3000;

const __dirname = path.dirname(__filename);
const __filename = fileURLToPath(import.meta.url);

const staticPath = path.join(__dirname, 'dist');

app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, (err) => {
    if (err) console.log("Ошибка при запуске сервера");
    console.log(`Приложение успешно запущено на - ${PORT}!`);
    open(`http://localhost:${PORT}`);
});