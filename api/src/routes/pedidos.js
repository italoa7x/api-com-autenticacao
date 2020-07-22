const routes = require('express').Router()
const pedidoController = require('../controllers/pedidoController')
const middlewareLogin = require('../middleware/login')

routes.get('/meus-pedidos', middlewareLogin, pedidoController.meusPedidos)

routes.get('/', middlewareLogin, pedidoController.index)

routes.post('/', middlewareLogin, pedidoController.storage)

routes.get('/:id', pedidoController.findById)

routes.delete('/:id', pedidoController.delete)


module.exports = routes