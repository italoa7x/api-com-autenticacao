
exports.up = function (knex) {
    return knex.schema.createTable('pedidos', (table) => {
        table.increments('id').primary();
        table.integer('produto_id').notNullable();
        table.integer('usuario_id').notNullable();
        table.double('quantidade').notNullable();
        table.foreign('usuario_id').references('id').inTable('usuarios');
        table.foreign('produto_id').references('id').inTable('produtos');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('pedidos')
};
