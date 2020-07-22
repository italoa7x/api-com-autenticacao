const connection = require('../database/configPg')

module.exports = {
    async storage(req, res) {
        const { nome, preco } = req.body
        const produto = await connection.table('produtos')
        .returning(['id', 'nome', 'preco'])
        .insert({
            nome: nome,
            preco: preco
        })
        return res.status(201).send(produto)
    },
    async index(req, res){
        const produtos = await connection('produtos')
        .select('*')
        return res.json(produtos)
        
    },
    async findById(req, res){
        const {id} = req.params

        const produto = await connection('produtos')
        .where('id', id)
        .first()
        .select()
        if(produto)
            return res.json(produto)
        
        
    }
}