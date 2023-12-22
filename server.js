import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 3000;

express.static.mime.define({'application/wasm': ['wasm']});

//app.use(express.static(`${__dirname}/`));
app.use(express.static(__dirname + '/dist'));
//app.use(express.static(`.`));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});