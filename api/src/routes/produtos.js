const routes = require('express').Router()
const middlewareLogin = require('../middleware/login')
const produtoController = require('../controllers/produtoController')


routes.post('/', middlewareLogin, produtoController.storage)

routes.get('/', produtoController.index)

routes.get('/:id', produtoController.findById)

module.exports = routes