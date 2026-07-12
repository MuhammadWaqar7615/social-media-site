const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => res.send('Server is working!'))

app.listen(PORT, () => {console.log("server is listening at port: ", PORT)});