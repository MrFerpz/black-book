require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport')
const { strategy } = require('./controllers/authController')
const indexRouter = require('./routes/indexRouter')
const app = express();
const prisma = require('./prisma/prisma')

// cors and json parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// passport setup
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.findUser(id);
        if (!user) 
        return done(null, false);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use("/", indexRouter);

// run server
console.log("Up on 3000")
app.listen(3000)