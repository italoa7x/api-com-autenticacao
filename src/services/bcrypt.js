const bcrypt = require('bcrypt')

module.exports = {
    criptografar(senha){
        const saltHashSenha = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, saltHashSenha)
    }
}