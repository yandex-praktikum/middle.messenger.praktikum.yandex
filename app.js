const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index.html", {title: "AuthPage"});
});

app.listen(process.env.PORT || PORT, () => console.log("success"))


