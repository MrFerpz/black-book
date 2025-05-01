const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require('bcrypt');
const prisma = require('../prisma/prisma');

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
    await prisma.signup(username, password)
}

// telling it to use the above strategy ("local")
async function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json(info);

        req.logIn(user, err => {
            if (err) return next(err);
            return res.json({message: "Logged in successfully"}, user)
        });
    })(req, res, next);
}

module.exports = {
    strategy,
    login,
    signup
}