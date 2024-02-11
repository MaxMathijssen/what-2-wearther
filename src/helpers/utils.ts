import { DAYS_OF_WEEK } from "./constants";

export function range(start: number, end?: number, step: number = 1): number[] {
  let output: number[] = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i: number = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}

export function getDayNames(): string[] {
  const currentDayNum = new Date().getDay();
  const days: string[] = [];

  for (let i = currentDayNum; i < currentDayNum + 7; i++) {
    if (i > 6) {
      days.push(DAYS_OF_WEEK[i - 7]);
    } else {
      days.push(DAYS_OF_WEEK[i]);
    }
  }
  return days;
}

export function getCurrentTimestamp(): number {
  const now = new Date();
  const currentTimestampInSeconds = Math.floor(now.getTime() / 1000);
  return currentTimestampInSeconds;
}

export const random = (
  min: number,
  max: number,
  { rounded } = { rounded: true }
) => {
  const partialVal = Math.random() * (max - min);

  if (rounded) {
    return Math.floor(partialVal) + min;
  } else {
    return partialVal + min;
  }
};
