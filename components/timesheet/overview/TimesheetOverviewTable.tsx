import {h} from "preact";
import {Timesheet} from "../../utils/api-client/types/Timesheet.ts";
import {Employee} from "../../utils/api-client/types/Employee.ts";
import TimesheetOverviewTableHead from "./TimesheetOverviewTableHead.tsx";
import TimesheetOverviewTableBody from "./TimesheetOverviewTableBody.tsx";

type TimesheetOverviewTableProps = {
  timesheet: Timesheet[];
  employees: Employee[];
  selectedYear: number;
  selectedMonth: number;
};

export default function TimesheetOverviewTable(
  { timesheet, employees }: TimesheetOverviewTableProps,
): h.JSX.Element {
  return (
    <div class="overflow-x-auto">
      <table class="min-w-full w-full bg-gray-100 rounded-lg overflow-hidden">
        <TimesheetOverviewTableHead />
        <TimesheetOverviewTableBody
          timesheet={timesheet}
          employees={employees}
        />
      </table>
    </div>
  );
}
