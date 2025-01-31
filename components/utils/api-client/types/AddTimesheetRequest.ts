import mongoose from "npm:mongoose@8.9.1/types/index.d.ts";

export interface AddTimesheetRequest
{
    employeeId: string;
    year: number;
    month: number;
    totalHours: number;
    totalBalance: number;
    days: Days[];
}

export interface Days
{
    day: number;
    hours: number|string;
    checkIn: string;
    checkOut: string;
    balance: number|string;
    dayOff: DayOff;
    sickLeave: SickLeave;
}

export interface DayOff
{
    isDayOff: boolean;
    isHoliday: boolean;
    isPaid: boolean;
    type: string;
}

export interface SickLeave
{
    isSickLeave: boolean;
}