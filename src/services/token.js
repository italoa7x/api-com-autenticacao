const jwt = require('jsonwebtoken')

module.exports = {
    gerarToken(usuario){
        return jwt.sign({
            id: usuario.id,
            email: usuario.email,
            senha: usuario.senha
        }, process.env.SECRET_KEY, { expiresIn: '1h' })
    }
}