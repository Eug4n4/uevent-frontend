const formatter = new Intl.DateTimeFormat("us", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const toDateString = (date: Date | string) => {
  let milliseconds = 0;
  if (typeof date === "string") {
    milliseconds = Date.parse(date);
  } else {
    milliseconds = date.getMilliseconds();
  }
  return formatter.format(milliseconds);
};
