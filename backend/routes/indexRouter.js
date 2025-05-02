const express = require('express');
const indexRouter = express();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController')

// auth
indexRouter.post("/api/login", authController.login);
indexRouter.post("/api/signup", authController.signup);
indexRouter.get("/api/authcheck", authController.isLoggedIn);
indexRouter.get("/api/logout", authController.logout);

// index
indexRouter.get("/api/posts", indexController.getPosts);

module.exports = indexRouter