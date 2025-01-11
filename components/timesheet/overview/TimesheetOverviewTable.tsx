import { h } from "preact";
import { useState } from "preact/hooks";
import {
  CalendarClock,
  CalendarX,
  Scale,
  TreePalm,
  User,
} from "https://esm.sh/lucide-preact@latest";
import { Timesheet } from "../../utils/api-client/types/Timesheet.ts";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import { mapTotalBalance } from "../mappers/mapTotalBalance.tsx";
import TimesheetCalendar from "./TimesheetCalendar.tsx";

type TimesheetOverviewTableProps = {
  timesheet: Timesheet[];
  employees: Employee[];
};

export default function TimesheetOverviewTable(
  { timesheet, employees }: TimesheetOverviewTableProps,
): h.JSX.Element {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <div class="overflow-x-auto">
      <table class="min-w-full w-full bg-gray-100 rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-300 text-gray-800">
            <th class="py-2 px-4 text-left">
              <User class="inline align-middle mr-2 w-5 h-5" />
              <span class="hidden lg:inline align-middle">Pracownik</span>
            </th>
            <th class="py-2 px-4 text-left">
              <CalendarX class="inline align-middle mr-2 w-5 h-5" />
              <span class="hidden lg:inline align-middle">
                Dni zarejestrowane
              </span>
            </th>
            <th class="py-2 px-4 text-left">
              <TreePalm class="inline align-middle mr-2 w-5 h-5" />
              <span class="hidden lg:inline align-middle">Dni wolne</span>
            </th>
            <th class="py-2 px-4 text-left">
              <CalendarClock class="inline align-middle mr-2 w-5 h-5" />
              <span class="hidden lg:inline align-middle">Łącznie godzin</span>
            </th>
            <th class="py-2 px-4 text-left">
              <Scale class="inline align-middle mr-2 w-5 h-5" />
              <span class="hidden lg:inline align-middle">Bilans</span>
            </th>
            <th class="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {timesheet.map((timesheet: Timesheet) => {
            const employee = employees.find((emp: Employee) =>
              emp._id === timesheet.employeeId
            );
            const totalHours = timesheet.totalHours.$numberDecimal;
            const totalBalance = mapTotalBalance(
              timesheet.totalBalance.$numberDecimal,
            );
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
                  {timesheet.days.filter((day) => day.dayOff.isDayOff).length}
                </td>
                <td class="py-2 px-4">{totalHours}</td>
                <td class="py-2 px-4">{totalBalance}</td>
                <td class="py-2 px-4">
                  <a
                    href={`/hr/timesheet/calendar/${timesheet.employeeId}?year=${timesheet.year}&month=${timesheet.month}`}
                    class="ml-2 p-2 bg-blue-500 text-white rounded"
                  >
                    Zobacz
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCalendar && selectedYear && selectedMonth && (
        <TimesheetCalendar
          timesheet={timesheet}
          year={selectedYear}
          month={selectedMonth}
        />
      )}
    </div>
  );
}
