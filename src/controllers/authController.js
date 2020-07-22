const connection = require('../database/configPg')
const bcrypt = require('bcrypt')
const geradorDeToken = require('../services/token')

module.exports = {
    async login(req, res, next) {
        const {email, senha} = req.body
        const usuarioComEmailPassado = await connection('usuarios')
        .where('email', email)
        .first()
        
        if(usuarioComEmailPassado){
            bcrypt.compare(senha, usuarioComEmailPassado.senha)
            .then(resultado => {
                if(resultado){
                    // gera o token para o usuario
                    let token = geradorDeToken.gerarToken(usuarioComEmailPassado)
                    //retorna o token gerado
                    return res.json(token)
                }else{
                    return res.status(401).send({
                        mensagem: 'Não autorizado. Senha  não cadastrada.'
                    })
                }
            })
        }else{
            return res.status(401).send({
                mensagem: 'Não autorizado. E-mail não cadastrado.'
            })
        }    
    
    }
}