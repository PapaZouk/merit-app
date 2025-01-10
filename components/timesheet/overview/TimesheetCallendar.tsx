import { h } from "preact";
import { Timesheet } from "../../utils/api-client/types/Timesheet.ts";
import {
  Flag,
  ShieldPlus,
  Sun,
  TreePalm,
} from "https://esm.sh/lucide-preact@latest";

type TimesheetCalendarProps = {
  timesheet: Timesheet[];
  year: number;
  month: number;
  onClose: () => void;
};

export default function TimesheetCalendar(
  { timesheet, year, month, onClose }: TimesheetCalendarProps,
): h.JSX.Element {
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayOfMonth = (new Date(year, month - 1, 1).getDay() + 6) % 7; // Adjust to start from Monday
  const currentDate = new Date();

  const getDayData = (day: number) => {
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
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <button
          onClick={onClose}
          class="mb-4 p-2 bg-red-500 text-white rounded"
        >
          Zamknij
        </button>
        <div class="hidden sm:flex flex-wrap gap-2 text-center font-bold text-xs sm:text-base">
          <div class="flex-1">Pon</div>
          <div class="flex-1">Wt</div>
          <div class="flex-1">Śr</div>
          <div class="flex-1">Czw</div>
          <div class="flex-1">Pt</div>
          <div class="flex-1">Sob</div>
          <div class="flex-1">Nd</div>
        </div>
        <div class="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-4">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} class="border p-2 flex-1 hidden sm:block">
              &nbsp;
            </div>
          ))}
          {daysArray.map((day) => {
            const {
              hours,
              balance,
              isHoliday,
              isDayOff,
              isSickLeave,
              dayOffType,
            } = getDayData(day);
            const isToday = currentDate.getFullYear() === year &&
              currentDate.getMonth() + 1 === month &&
              currentDate.getDate() === day;
            const dayOfWeek = (firstDayOfMonth + day - 1) % 7;
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday

            let bgColor = "";
            if (isToday) bgColor = "bg-blue-200";
            else if ((isHoliday || dayOffType === "bankHoliday") && !isSickLeave) bgColor = "bg-red-200";
            else if (isDayOff && !isSickLeave && dayOffType !== "bankHoliday") bgColor = "bg-yellow-200";
            else if (isSickLeave) bgColor = "bg-green-200";
            else if (isWeekend) bgColor = "bg-gray-200";

            return (
              <div
                key={day}
                class={`border p-2 text-center flex-1 ${bgColor}`}
              >
                <div class="font-bold flex items-center justify-center">
                  {day}
                  {dayOffType === "bankHoliday" && (
                    <Flag class="ml-1 w-4 h-4" />
                  )}
                  {isSickLeave && <ShieldPlus class="ml-1 w-4 h-4" />}
                  {(isHoliday && (
                    dayOffType !== "bankHoliday" && !isSickLeave && !isDayOff
                  )) && <TreePalm class="ml-1 w-4 h-4" />}
                  {(isDayOff && !isSickLeave && dayOffType !== "bankHoliday") && <Sun class="ml-1 w-4 h-4" />}
                </div>
                <div class="text-xs sm:text-sm">Godzin: {hours}</div>
                <div class="text-xs sm:text-sm">Bilans: {balance}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
