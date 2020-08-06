const connection = require('../database/configPg')
const cache = require('../services/cache')

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

        const produtosEmCache = await cache.get(id);

        if(produtosEmCache){
            return res.json(produtosEmCache);
        }
        
        const produto = await connection('produtos')
        .where('id', id)
        .first()
        .select()
        
        // adiciona o produto buscado em cache, para que na proxima consulta
        // o mesmo já esteja disponivel
        cache.set(id, produto, 60 * 15);
        return res.json(produto)
        
    }
}