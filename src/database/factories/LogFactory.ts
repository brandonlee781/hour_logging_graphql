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

interface NewLog {
  date: string;
  startTime: number;
  endTime: number;
  project: string;
  note: string;
}

export const makeLog = (log: NewLog): LogModel => {
  const { startTime, endTime, duration } = times();

  return (new LogModel())
    .setDate(log.date)
    .setStartTime(log.startTime < 10 ? `0${log.startTime}:00` : `${log.startTime}:00`)
    .setEndTime(log.endTime < 10 ? `0${log.endTime}:00` : `${log.endTime}:00`)
    .setDuration(log.endTime - log.startTime)
    .setProjectId(log.project)
    .setNote(log.note);
};