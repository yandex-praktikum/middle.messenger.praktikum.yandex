const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});