import Holidays from "npm:date-holidays";

export const isHolidayInPoland = (
  year: number,
  month: number,
  day: number,
): boolean => {
  const hd = new Holidays("PL");
  const holiday = hd.isHoliday(new Date(year, month - 1, day));
  return !!holiday;
};
