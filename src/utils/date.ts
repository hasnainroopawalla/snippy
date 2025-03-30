export const getMsUntilNextMinute = (): number => {
  const now = new Date();
  return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
};

export const getMsUntilNextSecond = () => 1000 - new Date().getMilliseconds();

export const addMinutesToDate = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60000);

export const convertDateToString = (date: Date) =>
  date.toLocaleString("en-US", {
    // weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: false,
  });
