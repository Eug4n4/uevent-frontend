const dateFormatter = new Intl.DateTimeFormat("us", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("us", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const millisToDateString = (milliseconds: number, formatter: Intl.DateTimeFormat) => {
  return formatter.format(milliseconds);
};

const objectToMillis = (o: Date | string) => {
  if (typeof o === "string") {
    return Date.parse(o);
  }
  return o.getMilliseconds();
};

export const toDateString = (date: Date | string) => {
  return millisToDateString(objectToMillis(date), dateFormatter);
};

export const toDateTimeString = (date: Date | string) => {
  return millisToDateString(objectToMillis(date), dateTimeFormatter);
};
