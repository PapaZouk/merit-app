type DayData = {
  hours: number;
  balance: number;
  isHoliday: boolean;
  isDayOff: boolean;
  isSickLeave: boolean;
  dayOffType: string;
};

export default function getGridDayBackgroundColor(
  dayData: DayData,
  isToday: boolean,
  isWorkDay: boolean,
  isWeekend: boolean,
) {
  const {
    isHoliday,
    isDayOff,
    isSickLeave,
    dayOffType,
  } = dayData;

  switch (true) {
    case isToday:
      return "bg-blue-200 border-solid border-2 border-sky-500";
    case isWorkDay && !isSickLeave && !isHoliday && !isDayOff && !isWeekend &&
      dayOffType !== "bankHoliday":
      return "bg-sky-200";
    case (isHoliday || dayOffType === "bankHoliday") && !isSickLeave:
      return "bg-red-200";
    case isDayOff && !isSickLeave && dayOffType !== "bankHoliday" &&
      dayOffType !== "maternityLeave" && dayOffType !== "parentalLeave" &&
      dayOffType !== "occasionalLeave" && dayOffType !== "childcareLeave":
      return "bg-yellow-200";
    case isDayOff && dayOffType === "maternityLeave":
      return "bg-purple-300";
    case isDayOff && dayOffType === "parentalLeave":
      return "bg-pink-300";
    case isDayOff && dayOffType === "occasionalLeave":
      return "bg-fuchsia-300";
    case isDayOff && dayOffType === "childcareLeave":
      return "bg-rose-400";
    case isSickLeave:
      return "bg-green-200";
    case isWeekend:
      return "bg-gray-200";
    default:
      return "bg-white";
  }
}
