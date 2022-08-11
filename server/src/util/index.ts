import { Between, FindOperator } from 'typeorm';

export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomResult(successRatio: number): boolean {
  return Math.random() < successRatio;
}

function getMidNight(year: number, month: number, date: number) {
  const timeZoneOffset = -9;
  return new Date(year, month, date, timeZoneOffset, 0, 0, 0);
}

export function getYesterday(date: Date): FindOperator<Date> {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateNum = date.getDate();
  const todayMidNight = getMidNight(year, month, dateNum);
  const yesterDayMidNight = getMidNight(year, month, dateNum - 1);
  return Between(yesterDayMidNight, todayMidNight);
}
