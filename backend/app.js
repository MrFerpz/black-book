require('dotenv').config();
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter')
const app = express();
const cookieParser = require('cookie-parser')

// cors set up with frontend as origin and credentials required
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// parsing middleware stuff
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/", indexRouter);

// run server
console.log("Up on 4000")
app.listen(4000)