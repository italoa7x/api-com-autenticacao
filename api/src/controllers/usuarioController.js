const connection = require('../database/configPg')
const bcryptService = require('../services/bcrypt')

module.exports = {
    async storage(req, res,) {
        const { nome, email, senha } = req.body
        
        const naoExisteOutroUsuarioOmesmoEmail = await connection('usuarios')
        .where('email', email)
        .select('*')
        if(!naoExisteOutroUsuarioOmesmoEmail.length > 0) {
            const usuario = await connection.table('usuarios')
            .returning(['id', 'nome', 'email', 'senha'])
            .insert({
                nome: nome,
                email: email,
                senha: bcryptService.criptografar(senha)
    
            })
            return res.status(201).send(usuario)
        }else{
            return res.status(401).send({
                message: 'Já existe um usuário com dados iguais'
            })
        }

    }
}