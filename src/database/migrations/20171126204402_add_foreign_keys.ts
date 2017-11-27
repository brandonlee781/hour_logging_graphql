// tslint:disable:no-any no-empty
import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<any> {
  return Promise.all([
    db.schema.table('logs', (table) => {
      table.foreign('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
  ]);
};

exports.down = function (db: Knex) {
  return Promise.resolve();
};