import * as Knex from 'knex';

exports.up = function (db: Knex): Promise<Knex.SchemaBuilder[]> {
  return Promise.all([
    db.schema.hasTable('dont_be_a').then((exists) => {
      if (!exists) {
        return db.schema.createTableIfNotExists('dont_be_a', (table: Knex.CreateTableBuilder) => {
          table.uuid('id').notNullable().primary();
          table.string('phrase').notNullable();
          table.string('episode_no');
          table.string('episode_title');
          table.timestamps(false, true);
        });
      }
    })
  ]);
};

exports.down = function (db: Knex): Promise<string> {
  return Promise.resolve('nope');
};
