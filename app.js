const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("user/home");
});

app.listen(PORT, () => {console.log("server is listening at port: ", PORT)});