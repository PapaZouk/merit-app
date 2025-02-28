import Holidays, { HolidaysTypes } from "npm:date-holidays";

export const isHolidayInPoland = (
  year: number,
  month: number,
  day: number,
): boolean => {
  const hd = new Holidays("PL");
  const holidays: false | HolidaysTypes.Holiday | HolidaysTypes.Holiday[] = hd
    .isHoliday(new Date(year, month - 1, day));

  if (!holidays) {
    return false;
  }


  if (Array.isArray(holidays)) {
    return holidays.some((h) => h.type === "public");
  }

  return (holidays as HolidaysTypes.Holiday).type === "public";
};
