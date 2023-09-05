import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/dist"));

app.get("*", (_reqest, response) => {
  response.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
