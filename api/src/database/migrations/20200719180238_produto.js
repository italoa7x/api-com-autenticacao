
exports.up = function(knex) {
  return knex.schema.createTable('produtos', (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.double('preco').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos')
};
