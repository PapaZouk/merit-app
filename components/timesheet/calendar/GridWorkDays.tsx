import { h } from "preact";
import {
  CircleDollarSign,
  CircleX,
  Flag,
  ShieldPlus,
  SquarePlus,
  Sun,
  TreePalm,
} from "https://esm.sh/lucide-preact@latest";
import getGridDayBackgroundColor from "./utils/getGridDayBackgroundColor.ts";

type GridWorkDaysProps = {
  firstDayOfMonth: number;
  daysArray: number[];
  currentDate: Date;
  year: number;
  month: number;
  getDayData: (day: number) => DayData;
  onDaySelect: (day: number) => void;
};

type DayData = {
  hours: number;
  balance: number;
  isHoliday: boolean;
  isDayOff: boolean;
  isSickLeave: boolean;
  dayOffType: string;
};

export default function GridWorkDays(
  {
    firstDayOfMonth,
    daysArray,
    currentDate,
    year,
    month,
    getDayData,
    onDaySelect,
  }: GridWorkDaysProps,
): h.JSX.Element {
  return (
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

        const isWorkDay = hours > 0;
        const isToday = currentDate.getFullYear() === year &&
          currentDate.getMonth() + 1 === month &&
          currentDate.getDate() === day;
        const dayOfWeek = (firstDayOfMonth + day - 1) % 7;
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday

        const bgColor = getGridDayBackgroundColor(
          getDayData(day),
          isToday,
          isWorkDay,
          isWeekend,
        );

        return (
          <div
            key={day}
            class={`relative border p-2 text-center flex-1 ${bgColor} flex flex-col hover:bg-opacity-75 hover:shadow-md transition duration-200`}
          >
            <div class="absolute top-1 right-1">
              <SquarePlus
                class="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={() => onDaySelect(day)}
              />
            </div>
            <div class="font-bold flex items-center justify-center mb-2">
              {day}
              {dayOffType === "bankHoliday" && <Flag class="ml-1 w-4 h-4" />}
              {isSickLeave && <ShieldPlus class="ml-1 w-4 h-4" />}
              {(isHoliday && (
                dayOffType !== "bankHoliday" && !isSickLeave && !isDayOff
              )) && <TreePalm class="ml-1 w-4 h-4" />}
              {(isDayOff && !isSickLeave && dayOffType !== "bankHoliday") &&
                <Sun class="ml-1 w-4 h-4" />}
            </div>
            <div class="flex-1">
              <div class="text-xs sm:text-sm">Godzin: {hours}</div>
              <div class="text-xs sm:text-sm">
                Bilans:{" "}
                <span
                  class={`${balance < 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {balance <= 0 ? "" : "+"}
                  {balance}
                </span>
              </div>
              {dayOffType === "paid" && (
                <div class="flex items-center justify-center mt-1">
                  <CircleDollarSign class="ml-1 w-4 h-4" />
                </div>
              )}
              {dayOffType === "unpaid" && (
                <div class="flex items center justify-center mt-1">
                  <CircleX class="ml-1 w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
