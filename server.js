import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + "/dist"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(PORT, function () {
    console.log(`Example app listening on http://localhost:${PORT}`);
});
