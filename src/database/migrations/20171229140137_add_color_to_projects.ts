// tslint:disable:no-any
import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<any> {
  return Promise.all([
    db.schema.table('projects', (table: Knex.AlterTableBuilder) => {
      table.string('color', 7);
    })
  ]);
};

exports.down = function (db: Knex): Promise<string> {
  return Promise.resolve('resolved');
};
