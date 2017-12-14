// tslint:disable:no-any
import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<any> {
  return Promise.all([
    db.schema.createTableIfNotExists('projects', (table: Knex.CreateTableBuilder) => {
      table.string('id').notNullable().primary();
      table.string('name').notNullable();
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function (db: Knex): Promise<any> {
  return Promise.all([
    db.schema.dropTable('projects')
  ]);
};
