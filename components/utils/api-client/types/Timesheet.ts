import mongoose from 'npm:mongoose';


export interface Timesheet {
    _id: string;
    employeeId: string;
    year: number;
    month: number;
    totalHours: mongoose.Schema.Types.Decimal128;
    totalBalance: mongoose.Schema.Types.Decimal128;
    days: Days[];
}

export interface Days {
    day: number;
    hours: mongoose.Schema.Types.Decimal128;
    checkIn: string;
    checkOut: string;
    balance: mongoose.Schema.Types.Decimal128;
    dayOff: DayOff;
    sickLeave: SickLeave;
}

export interface DayOff {
    isDayOff: boolean;
    isHoliday: boolean;
    isPaid: boolean;
    type: string;
}

export interface SickLeave {
    isSickLeave: boolean;
}

export interface TimesheetDayUpdateRequest {
    _id: string;
    employeeId: string;
    year: number;
    month: number;
    totalHours: number;
    totalBalance: number;
    days: Days[];
}