import { DAYS_OF_WEEK, MONTHS_OF_YEAR } from "./constants";

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

export function getFormattedDate(): string {
  const currentDate = new Date();
  const dayName = DAYS_OF_WEEK[currentDate.getDay()];
  const date = currentDate.getDate();
  const monthName = MONTHS_OF_YEAR[currentDate.getMonth()];

  return `${dayName} ${date} ${monthName}`;
}

export function getCurrentTimestamp(): number {
  const now = new Date();
  const currentTimestampInSeconds = Math.floor(now.getTime() / 1000);
  return currentTimestampInSeconds;
}

export function getCurrentTime(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${hours}:${minutesStr} ${ampm}`;
}

export function getEndOfDayTimestamp(): number {
  const now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  return Math.floor(endOfDay.getTime() / 1000);
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

export function convertTimestampToHourAmPm(timestampInSeconds: number): string {
  const timestampInMilliseconds = timestampInSeconds * 1000;
  const date = new Date(timestampInMilliseconds);

  let hour = date.getHours();

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour || 12;

  return `${hour} ${ampm}`;
}

export function convertTimestampToHour(timestampInSeconds: number): number {
  const timestampInMilliseconds = timestampInSeconds * 1000;
  const date = new Date(timestampInMilliseconds);

  return date.getHours();
}

export function convertEpochToTime(epoch: number): string {
  const date = new Date(epoch * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${hours}:${formattedMinutes}`;
}
