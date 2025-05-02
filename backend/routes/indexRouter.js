const express = require('express');
const indexRouter = express();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController')

indexRouter.post("/api/login", authController.login);
indexRouter.post("/api/signup", authController.signup);
indexRouter.get("/api/authcheck", authController.isLoggedIn);

module.exports = indexRouter