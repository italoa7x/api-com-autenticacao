const express = require('express')
const usuarioRoutes = require('./routes/usuarios')
const pedidoRoutes = require('./routes/pedidos')
const produtoRoutes = require('./routes/produtos')
const authRoutes = require('./routes/auth')

const routes = express();
routes.use('/produtos', produtoRoutes)
routes.use('/pedidos', pedidoRoutes)
routes.use('/usuarios', usuarioRoutes)
routes.use('/login', authRoutes)

//retorna algum erro caso a rota chamada nao exista
routes.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

routes.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})
module.exports = routes