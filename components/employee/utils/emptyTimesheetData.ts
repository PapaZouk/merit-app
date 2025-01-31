import { Days, Timesheet } from "../../utils/api-client/types/Timesheet.ts";

export const emptyTimesheetData = (
  employeeId: string,
  year: number,
  month: number,
): Timesheet => ({
  _id: "",
  employeeId: employeeId,
  year: year,
  month: month,
  totalHours: "",
  totalBalance: "",
  days: [] as Days[],
});
