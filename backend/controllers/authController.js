const bcrypt = require('bcrypt');
const prisma = require('../prisma/prisma');
const jwt = require('jsonwebtoken')

// reminder, controller functions needs to return something (res.json, res.status, res.send etc)

async function signup(req, res) {
    const username = req.body.username;
    const password = bcrypt(req.body.password, 10);
    try {
        await prisma.signup(username, password);
        return res.json("Successful sign-up.")
    } catch(err) {
        console.log(err);
        return
    }
}

async function login(req, res) {
    // clean any existing tokens
    res.clearCookie("token")

    // find the user
    const user = await prisma.findUserByName(req.body.username);

    // compare username
    if (!user) { 
        return res.status(401).send("User not found.") 
    };

    // compare password
    if (!bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).send("Incorrect password.")
    };

    // remove sensitive data from user object
    const payload = {
        id: user.id,
        username: user.username,
    }

    // make the JWT token
    const token = jwt.sign(payload, "megasecretkeyshhhhh", {expiresIn: "1h"});

    // send it in the response in the form of an HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 2, // 2 hour session
    });
    res.json("Successfully logged in.")
}

async function isLoggedIn(req, res) {
    console.log(req.cookies)
    // decode token
    const user = jwt.verify(req.cookies.token, "megasecretkeyshhhhh");
    if (!user) {
        req.user = user;
        res.status(401).send("Not logged in.")
    }

    return res.json(user)
}

async function logout(req, res) {
    res.clearCookie("token");
    res.json("User has logged out.")
}

module.exports = {
    login,
    signup,
    isLoggedIn,
    logout,
}