const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, 'secret')
        req.usuario = decode
        next()
    } catch (error) {
        return res.status(401).send({
            mensagem: 'Falha na autenticação'
        })        
    }
}