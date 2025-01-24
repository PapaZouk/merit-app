import mongoose from "npm:mongoose";
import {
  Days,
  Timesheet,
  TimesheetDayUpdateRequest,
} from "../types/Timesheet.ts";
export default function createTimesheetDayUpdateRequest(
    _id: string,
    employeeId: string,
    year: number,
    month: number,
    day: number,
    checkIn: string,
    checkOut: string,
    timesheet: Timesheet,
    sickLeave : boolean,
    dayOff?: {
      isDayOff: boolean;
      isHoliday: boolean;
      isPaid: boolean;
      type: string;
    },
): TimesheetDayUpdateRequest {

  const balance= calculateDayBalance(checkIn, checkOut);
  const workedTime = calculateWorkedTime(checkIn, checkOut);

  const dayData = {
    day: day,
    hours: mongoose.Types.Decimal128.fromString(workedTime),
    checkIn,
    checkOut,
    balance: mongoose.Types.Decimal128.fromString(balance.toString()),
    dayOff: {
      isDayOff: dayOff?.isDayOff || false,
      isHoliday: dayOff?.isHoliday || false,
      isPaid: dayOff?.isPaid || false,
      type: dayOff?.type || "",
    },
    sickLeave: {
      isSickLeave: sickLeave,
    },
  };


  if (timesheet.days.find((d) => d.day === day)) {
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
        return d;
      }) as Days[],
    };
  } else {
    return {
      _id: _id,
      employeeId: employeeId,
      year: year,
      month: month,
      totalHours: Number.parseFloat(workedTime) + timesheet.days.map((d) => parseFloat(d.hours.$numberDecimal)).reduce((a, b) => a + b, 0),
      totalBalance: balance + timesheet.days.map((d) => parseFloat(d.balance.$numberDecimal)).reduce((a, b) => a + b, 0),
      days: [
        ...timesheet.days,
        dayData,
      ] as Days[],
    };
  }
}
import {calculateDayBalance} from "../../../timesheet/utils/calculateDayBalance.ts";

import {calculateWorkedTime} from "../../../timesheet/utils/calculateWorkedTime.ts";



