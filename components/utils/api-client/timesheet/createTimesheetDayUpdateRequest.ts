import {Days, Timesheet, TimesheetDayUpdateRequest,} from "../types/Timesheet.ts";
import {calculateDayBalance} from "../../../timesheet/utils/calculateDayBalance.ts";

import {calculateWorkedTime} from "../../../timesheet/utils/calculateWorkedTime.ts";
import {isHolidayInPoland} from "../../../timesheet/calendar/utils/isHolidayInPoland.ts";

export default function createTimesheetDayUpdateRequest(
  _id: string,
  employeeId: string,
  year: number,
  month: number,
  day: number,
  checkIn: string,
  checkOut: string,
  timesheet: Timesheet,
  sickLeave: boolean,
  dayOff?: {
    isDayOff: boolean;
    isHoliday: boolean;
    isPaid: boolean;
    type: string;
  },
): TimesheetDayUpdateRequest {
  const balance = calculateDayBalance(checkIn, checkOut);
  const workedTime = calculateWorkedTime(checkIn, checkOut);

  let holiday;

  if (isHolidayInPoland(year, month, day)) {
    holiday = true;
  } else {
    holiday = false;
  }

  const dayData = {
    day: day,
    hours: workedTime,
    checkIn,
    checkOut,
    balance: balance.toString(),
    dayOff: {
      isDayOff: dayOff?.isDayOff || false,
      isHoliday: holiday,
      isPaid: dayOff?.isPaid || false,
      type: dayOff?.type || "",
    },
    sickLeave: {
      isSickLeave: sickLeave,
    },
  };

  if (timesheet.days.find((d: Days) => d.day === day)) {
    return {
      _id: _id,
      employeeId: employeeId,
      year: year,
      month: month,
      totalHours: timesheet.days.map((d) => {
        if (d.day === day) {
          return Number.parseFloat(workedTime);
        } else {
          return parseFloat(d.hours.$numberDecimal);
        }
      }).reduce((a, b) => a + b, 0),
      totalBalance: timesheet.days.map((d) => {
        if (d.day === day) {
          return balance;
        } else {
          return parseFloat(d.balance.$numberDecimal);
        }
      }).reduce((a, b) => a + b, 0),
      days: timesheet.days.map((d) => {
        if (d.day === day) {
          return dayData;
        }
        if (d.day && isHolidayInPoland(year, month, d.day)) {
          return {
            ...d,
            checkIn: "08:00",
            checkOut: "16:00",
            dayOff: {
              ...d.dayOff,
              isDayOff: true,
              isPaid: false,
              isHoliday: true,
              type: "bankHoliday",
            },
            sickLeave: {
              isSickLeave: false,
            },
          };
        }
        return d;
      }) as Days[],
    };
  } else {
    const timesheetPrevDays: Days[] = timesheet.days.map((d: Days) => {
      if (d.day && isHolidayInPoland(year, month, d.day)) {
        return {
          ...d,
          hours: "8",
          balance: "0",
          checkIn: "08:00",
          checkOut: "16:00",
          dayOff: {
            isDayOff: true,
            isHoliday: true,
            isPaid: false,
            type: "bankHoliday"
          },
          sickLeave: {
            isSickLeave: false,
          }
        };
      }
      return d;
    });
    return {
      _id: _id,
      employeeId: employeeId,
      year: year,
      month: month,
      totalHours: Number.parseFloat(workedTime) +
        timesheet.days.map((d) => parseFloat(d.hours.$numberDecimal)).reduce(
          (a, b) => a + b,
          0,
        ),
      totalBalance: balance +
        timesheet.days.map((d) => parseFloat(d.balance.$numberDecimal)).reduce(
          (a, b) => a + b,
          0,
        ),
      days: [
          ...timesheetPrevDays,
          dayData
      ]
    };
  }
}
