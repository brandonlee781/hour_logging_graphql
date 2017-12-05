// tslint:disable:no-any
import * as faker from 'faker';
import * as Knex from 'knex';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

import { Tables } from '../../core/Tables';
import { makeLog } from '../factories/LogFactory';

const randNum = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
interface NewLog {
  date: string;
  startTime: number;
  endTime: number;
  project: string;
  note: string;
}
exports.seed = async (db: Knex) => {
  const projects = await db.select('id').from(Tables.Projects);
  const projectIds = projects.map(project => project.id);

  // Get the last 30 days
  const today = DateTime.local();
  const dates = [];
  let times = 1;
  while (times <= 30) {
    dates.push(today.minus({ days: times }));
    times += 1;
  }
  // Each day gets 8 hours
  // Divide the 8 hours into random chunks
  const days = dates.map((date) => {
    let n = 8;
    const a = [];
    while (n > 0) {
      const s = Math.round(Math.random() * n);
      a.push(s);
      n -= s;
    }

    return {
      date,
      hours: a.filter(i => i !== 0)
    };
  });
  // assign a project and note to each chunk
  const logEntries = [];
  days.forEach((day, ind) => {
    const logs = day.hours.map((hour, i) => {
      let start = 8;
      if (i !== 0) {
        const total = day.hours.slice(0, i).reduce((a, b) => a + b);
        start = 8 + total; 
      }
      return {
        date: day.date.toFormat('yyyy-MM-dd'),
        startTime: start,
        endTime: start + hour,
        project: projectIds[randNum(0, projectIds.length - 1)],
        note: faker.lorem.sentence()
      };
    });
    logEntries.push(...logs);
  });

  let entries = [];
  _.forEach(logEntries, (log: NewLog) => {
    entries = _.concat(entries, makeLog(log).toDatabaseObject());
  });

  return await db(Tables.Logs).insert(entries);
};
