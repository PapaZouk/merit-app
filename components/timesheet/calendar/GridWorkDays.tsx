import { h } from "preact";
import { LuFlag, LuSquarePlus, LuSun } from "@preact-icons/lu";
import getGridDayBackgroundColor from "./utils/getGridDayBackgroundColor.ts";
import { mapDayOffTypeIcon } from "./utils/mapDayOffTypeIcon.tsx";
import { mapDayOffPayType } from "./utils/mapDayOffPayType.tsx";
import { isHolidayInPoland } from "./utils/isHolidayInPoland.ts";
import {mapTotalBalance} from "../mappers/mapTotalBalance.tsx";

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
        const dayData = getDayData(day);

        const isWorkDay = dayData.hours > 0;
        const isToday = currentDate.getFullYear() === year &&
          currentDate.getMonth() + 1 === month &&
          currentDate.getDate() === day;
        const dayOfWeek = (firstDayOfMonth + day - 1) % 7;
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday
        dayData.isHoliday = isHolidayInPoland(year, month, day);

        const bgColor = getGridDayBackgroundColor(
          dayData,
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
              <LuSquarePlus
                class="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={() => onDaySelect(day)}
              />
            </div>
            <div class="font-bold flex items-center justify-center mb-2">
              {day}
              {!isWeekend && mapDayOffTypeIcon(dayData.dayOffType)}
              {(dayData.isHoliday || dayData.dayOffType === "bankHoliday") &&
                <LuFlag class="ml-1 w-4 h-4" />}
              {isWeekend && <LuSun class="ml-1 w-4 h-4" />}
            </div>
            <div class="flex-1">
              <div class="text-xs sm:text-sm">Godzin: {dayData.hours}</div>
              <div class="text-xs sm:text-sm">
                Bilans:{" "}
                <span
                  class={`${dayData.balance < 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {mapTotalBalance(dayData.balance, false)}
                </span>
              </div>
              {!isWeekend && mapDayOffPayType(dayData.dayOffType)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
