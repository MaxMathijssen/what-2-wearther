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

export function getEndOfDayTimestamp(): number {
  const now = new Date(); // Current date and time
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999 // Set to the last millisecond of the day
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

export function convertTimestampToHour(timestampInSeconds: number): string {
  // Convert seconds to milliseconds for JavaScript Date
  const timestampInMilliseconds = timestampInSeconds * 1000;
  const date = new Date(timestampInMilliseconds);

  // Get local hour from the Date object
  let hour = date.getHours();

  // Determine AM or PM
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert hour from 24-hour to 12-hour format
  hour = hour % 12;
  hour = hour || 12; // Convert hour '0' to '12' for 12 AM and 12 PM

  return `${hour} ${ampm}`;
}
