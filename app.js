const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(path.join('/app', "public", "index.html"));
});

app.listen(PORT, () => {console.log("server is listening at port: ", PORT)});