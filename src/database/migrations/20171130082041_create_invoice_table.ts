import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<Knex.CreateTableBuilder[]> {
  return Promise.all([
    db.schema.createTable('invoices', (table: Knex.CreateTableBuilder) => {
      table.string('id').notNullable().primary();
      table.integer('number').notNullable();
      table.string('date').notNullable();
      table.json('logs');
      table.integer('hours');
      table.integer('rate');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function (db: Knex): Promise<Knex.CreateTableBuilder[]> {
  return Promise.all([
    db.schema.dropTable('invoices')
  ]);
};
