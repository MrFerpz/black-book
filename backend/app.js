require('dotenv').config();
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter')
const app = express();

// cors and json parsing
app.use(cors());
app.use(express.json());

app.use("/", indexRouter)

// run server
console.log("Up on 3000")
app.listen(3000)