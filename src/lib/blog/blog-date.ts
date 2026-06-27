const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EDITORIAL_TIME_ZONE = "Europe/Rome";

export function isValidEditorialDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function compareEditorialDates(a: string, b: string): number {
  return a.localeCompare(b);
}

export function formatEditorialDate(value: string): string {
  const date = editorialDateToDate(value);

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function editorialDateToIso(value: string): string {
  return `${value}T00:00:00.000Z`;
}

export function editorialDateToDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

export function isFutureEditorialDate(value: string): boolean {
  return compareEditorialDates(value, getTodayEditorialDate()) > 0;
}

function getTodayEditorialDate(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: EDITORIAL_TIME_ZONE,
    year: "numeric",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to resolve today's editorial date.");
  }

  return `${year}-${month}-${day}`;
}
