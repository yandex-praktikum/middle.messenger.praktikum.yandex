// server.js
const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, function () {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT} ${__dirname}`);
});
