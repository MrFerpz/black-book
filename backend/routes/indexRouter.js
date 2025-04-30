const express = require('express')
const indexRouter = express();
const indexController = require('../controllers/indexController')

indexRouter.post("/api/login", indexController.login)

module.exports = indexRouter