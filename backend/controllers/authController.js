const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require('bcrypt');
const prisma = require('../prisma/prisma');

// reminder, controller functions needs to return something (res.json, res.status, res.send etc)

// setting up LocalStrategy
const strategy = new LocalStrategy(
    async function (username, password, done) {
        const user = await prisma.findUserByName(username);
        if (!user) {
            return done(null, false, {message: "No user found."})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return done(null, false, {message: "Incorrect password."})
        }
        return done(null, user)
    }
)

// makes new user
async function signup(req, res) {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    try {
        await prisma.signup(username, password);
        return res.status(200).json("Successfully signed up.")
    } catch(err) {
        return res.status(401).json(err)
    }}  

// telling it to use the above strategy ("local")
async function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        // err handling
        if (err) return next(err);
        if (!user) return res.status(401).json(info);

        // login func so req.user persists
        req.logIn(user, err => {
            if (err) return next(err);
            return res.json(user);
        });
    })(req, res, next);
}

function returnUserDetails(req, res) {
    console.log(req.user);
    return res.json(req.user);
}

function isLoggedIn(req, res, next) {
    if (req.user) {
        console.log(req.user)
        return next();
    }
    res.status(401).json("Error: user not logged in.");
  }

function logout(req, res) {
    req.logout(function(err) {
    if (err) return next(err);
    return res.json("Logged out.");
})};

module.exports = {
    strategy,
    login,
    signup,
    isLoggedIn,
    logout,
    returnUserDetails
}