import { h } from "preact";
import { Days, Timesheet } from "../../utils/api-client/types/Timesheet.ts";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import { mapTotalBalance } from "../mappers/mapTotalBalance.tsx";
import Loader from "../../loader/loader.tsx";

type TimesheetOverviewTableProps = {
  timesheet: Timesheet[];
  employees: Employee[];
};

export default function TimesheetOverviewTableBody(
  { timesheet, employees }: TimesheetOverviewTableProps,
): h.JSX.Element {
  if (!timesheet || !employees) {
    return <Loader />;
  }

  return (
    <tbody>
      {timesheet.map((timesheet: Timesheet) => {
        const employee = employees.find((emp: Employee) =>
          emp._id === timesheet.employeeId
        );
        const totalHours = Number.parseFloat(
          timesheet.totalHours.$numberDecimal,
        ).toFixed(2);
        const totalBalance = mapTotalBalance(
          timesheet.totalBalance.$numberDecimal,
        );
        const employeeTimesheetDetailsUrl =
          `/hr/timesheet/calendar/${timesheet.employeeId}?year=${timesheet.year}&month=${timesheet.month}`;

        return (
          <tr
            key={timesheet._id}
            class="border-b border-gray-300 text-gray-800 hover:bg-gray-200"
          >
            <td class="py-2 px-4">
              {employee
                ? `${employee.personalData.firstName} ${employee.personalData.lastName}`
                : "Brak danych"}
            </td>
            <td class="py-2 px-4">
              {timesheet.days.length}
            </td>
            <td class="py-2 px-4">
              {timesheet.days.filter((day: Days) =>
                day.dayOff.isDayOff || day.dayOff.isHoliday ||
                day.sickLeave.isSickLeave
              ).length}
            </td>
            <td class="py-2 px-4">{totalHours}</td>
            <td class="py-2 px-4">{totalBalance}</td>
            <td class="py-2 px-4">
              <a
                href={employeeTimesheetDetailsUrl}
                class="ml-2 p-2 bg-blue-500 text-white rounded"
              >
                Zobacz
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
