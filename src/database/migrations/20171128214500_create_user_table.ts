import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<Knex.SchemaBuilder[]> {
  return Promise.all([
    db.schema.hasTable('users').then((exists) => {
      if (!exists) {
        return db.schema.createTableIfNotExists('users', (table: Knex.CreateTableBuilder) => {
          table.uuid('id').notNullable().primary();
          table.string('email').notNullable();
          table.string('password').notNullable();
        });
      }
    })
  ]);
};

exports.down = function (knex: Knex): Promise<string> {
  return Promise.resolve('nope');
};
