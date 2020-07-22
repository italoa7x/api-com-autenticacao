const express = require('express')
const authController = require('../controllers/authController')

const routes = express()

routes.use('/', authController.login)

module.exports = routes