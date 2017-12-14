import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<Knex.CreateTableBuilder[]> {
  return Promise.all([
    db.schema.createTableIfNotExists('invoices', (table: Knex.CreateTableBuilder) => {
      table.string('id').notNullable().primary();
      table.integer('number').notNullable();
      table.string('date').notNullable();
      table.json('logs');
      table.decimal('hours', 8, 1);
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
