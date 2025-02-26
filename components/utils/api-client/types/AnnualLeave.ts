export interface AnnualLeave {
  _id: {
    month: number;
  };
  month: number;
  employeeId: string;
  days: AnnualLeaveDay[];
}

export interface AnnualLeaveDay {
    day: number;
    dayOff: {
        isDayOff: boolean;
        isHoliday: boolean;
        isPaid: boolean;
        type: string;
    };
}
