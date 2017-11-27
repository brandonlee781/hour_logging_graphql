import * as faker from 'faker';
import { DateTime } from 'luxon';
import { LogModel } from '../../models/LogModel';

const randNum = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const times = () => {
  const startStr = `${randNum(8, 17)}:00`;
  const startTime = DateTime.fromString(startStr, 'H:mm');
  const endTime = DateTime
    .fromString(startStr, 'H:mm')
    .plus({ hours: randNum(1, 8) });

  return {
    startTime: startTime.toFormat('H:mm'),
    endTime: endTime.toFormat('H:mm'),
    duration: endTime.diff(startTime, 'hours').hours
  };
};

export const makeLog = (projectId: string): LogModel => {
  const { startTime, endTime, duration } = times();

  return (new LogModel())
    .setDate(DateTime.fromJSDate(faker.date.recent()).toFormat('yyyy-MM-dd'))
    .setStartTime(startTime)
    .setEndTime(endTime)
    .setDuration(duration)
    .setProjectId(projectId)
    .setNote(faker.lorem.sentence());
};