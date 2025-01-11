import { h } from "preact";
import { Timesheet } from "../../utils/api-client/types/Timesheet.ts";
import GridWeekDayNames from "../calendar/GridWeekDayNames.tsx";
import GridWorkDays from "../calendar/GridWorkDays.tsx";
import BackButton from "../../buttons/BackButton.tsx";

type TimesheetCalendarProps = {
  timesheet: Timesheet[];
  year: number;
  month: number;
};

type DayData = {
  hours: number;
  balance: number;
  isHoliday: boolean;
  isDayOff: boolean;
  isSickLeave: boolean;
  dayOffType: string;
};

export default function TimesheetCalendar(
  { timesheet, year, month }: TimesheetCalendarProps,
): h.JSX.Element {
  const daysInMonth: number = new Date(year, month, 0).getDate();
  const daysArray: number[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1,
  );
  const firstDayOfMonth: number = (new Date(year, month - 1, 1).getDay() + 6) %
    7; // Adjust to start from Monday
  const currentDate: Date = new Date();

  const getDayData = (day: number): DayData => {
    for (const t of timesheet) {
      if (t.year === year && t.month === month) {
        const dayData = t.days.find((d) => d.day === day);
        if (dayData) {
          return {
            hours: parseFloat(dayData.hours.$numberDecimal),
            balance: parseFloat(dayData.balance.$numberDecimal),
            isHoliday: dayData.dayOff.isHoliday,
            isDayOff: dayData.dayOff.isDayOff,
            isSickLeave: dayData.sickLeave.isSickLeave,
            dayOffType: dayData.dayOff.type,
          };
        }
      }
    }
    return {
      hours: 0,
      balance: 0,
      isHoliday: false,
      isDayOff: false,
      isSickLeave: false,
      dayOffType: "",
    };
  };

  return (
    <div class="w-full bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <div class="w-full">
        <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6">
          <BackButton href={"/hr/timesheet/overview"} />
        </div>
        <div class="col-span-4">
          <GridWeekDayNames />
          <GridWorkDays
              firstDayOfMonth={firstDayOfMonth}
              daysArray={daysArray}
              currentDate={currentDate}
              year={year}
              month={month}
              getDayData={getDayData}
          />
        </div>
      </div>
    </div>
  );
}