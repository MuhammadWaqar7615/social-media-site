const express = require('express')
const postRouters = require('./routes/postRoutes');
const path = require('path')
const app = express()
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

app.use(postRouters);

app.listen(PORT, () => {console.log("server is listening at port: ", PORT)});