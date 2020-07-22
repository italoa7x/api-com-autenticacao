const connection = require('../database/configPg')

module.exports = {
    async storage(req, res) {
        //pega os dados do pedido
        const { quantidade, produto_id } = req.body
        // pega o ID do usuario logado
        const idDoUsuarioLogado = req.usuario.id
        const pedido = await connection('pedidos')
            .returning(['id', 'quantidade', 'produto_id', 'usuario_id'])
            .insert({
                usuario_id: idDoUsuarioLogado,
                produto_id: produto_id,
                quantidade: quantidade
            })

        if (pedido) {
            return res.status(201).json(pedido)
        }
    },
    async index(req, res) {
        const pedidos = await connection('pedidos')
            .join('produtos', 'produtos.id', 'pedidos.produto_id')
            .select([
                'pedidos.id',
                'pedidos.quantidade',
                'produtos.nome',
                'produtos.preco',])

        return res.json(pedidos)

    },
    async delete(req, res) {
        const { id } = req.params
        await connection('pedidos')
            .where('id', id)
            .del()
        console.log(id)
        return res.status(200).send()
    },
    async findById(req, res) {
        const { id } = req.params
        const pedido = await connection('pedidos')
            .join('produtos', 'produtos.id', '=', 'pedidos.produto_id')
        if (pedido)
            return res.json(pedido)
    },

    async meusPedidos(req, res) {
        const idDoUsuarioLogado = req.usuario.id
        try {
            const pedidos = await connection('pedidos')
                .join('usuarios', 'usuarios.id', '=', idDoUsuarioLogado)
                .select([
                'pedidos.id',
                'pedidos.quantidade',
                'pedidos.produto_id',
                'usuarios.nome'])
            return res.json(pedidos)
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao buscar meus pedidos.\n'+error
            })
        }
    }

}