import Day from "dayjs";

export const elapseTime = (date) => {
  if (!date) return false;

  const now = Day();
  let initDate = Day(date);
  const diffMin = now.diff(initDate, "minute");
  const diffHrs = now.diff(initDate, "hour");
  const diffDay = now.diff(initDate, "day");

  return (
    (diffMin < 60 && diffMin + "min") ||
    (diffMin >= 60 && diffHrs + (diffHrs >= 2 ? " horas " : " hora")) ||
    (diffHrs > 24 && diffDay + "d")
  );
};
