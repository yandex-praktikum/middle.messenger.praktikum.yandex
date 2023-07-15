import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('./dist'));
app.use('/*', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
