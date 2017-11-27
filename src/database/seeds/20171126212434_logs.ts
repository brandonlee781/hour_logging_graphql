// tslint:disable:no-any
import * as Knex from 'knex';
import * as _ from 'lodash';

import { Tables } from '../../core/Tables';
import { makeLog } from '../factories/LogFactory';

exports.seed = async (db: Knex) => {
  const projects = await db.select('id').from(Tables.Projects);
  const projectIds = projects.map(project => project.id);

  let entries = [];
  _.forEach(projectIds, (projectId: string) => {
    entries = _.concat(entries, _.times(10, () => makeLog(projectId).toDatabaseObject()));
  });

  return await db(Tables.Logs).insert(entries);
};
