// tslint:disable:no-any
import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<any> {
  return Promise.all([
    db.schema.createTable('logs', (table: Knex.CreateTableBuilder) => {
      table.uuid('id').notNullable().primary();
      table.string('date').notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.float('duration').notNullable();
      table.string('project_id');
      table.string('note');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function (db: Knex): Promise<any> {
  return Promise.all([
    db.schema.dropTable('logs')
  ]);
};