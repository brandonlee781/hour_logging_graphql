import * as Knex from 'knex';
import * as _ from 'lodash';

import { Tables } from '../../core/Tables';
import { makeProject } from '../factories/ProjectFactory';

exports.seed = function (db: Knex) {
  const projects =  _.times(10, () => makeProject().toDatabaseObject());
  return db(Tables.Projects).insert(projects); 
};
