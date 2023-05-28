const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
