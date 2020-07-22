const routes = require('express').Router()
const usuarioController = require('../controllers/usuarioController')

routes.post('/', usuarioController.storage)


module.exports = routes