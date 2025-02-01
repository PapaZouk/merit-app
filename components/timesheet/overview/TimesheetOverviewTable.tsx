import { h } from "preact";
import { useState } from "preact/hooks";
import { Timesheet } from "../../utils/api-client/types/Timesheet.ts";
import { Employee } from "../../utils/api-client/types/Employee.ts";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const timesheetPerPage = 8;
  const indexOfLastTimesheet = currentPage * timesheetPerPage;
  const indexOfFirstTimesheet = indexOfLastTimesheet - timesheetPerPage;
  const currentTimesheet = timesheet.slice(
    indexOfFirstTimesheet,
    indexOfLastTimesheet,
  );
  const totalPages = Math.ceil(timesheet.length / timesheetPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div class="overflow-x-auto">
      <table class="min-w-full w-full bg-gray-100 rounded-lg overflow-hidden">
        <TimesheetOverviewTableHead />
        <TimesheetOverviewTableBody
          timesheet={currentTimesheet}
          employees={employees}
        />
      </table>
      <div class="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Poprzednie
        </button>
        <span class="px-4 py-2">
          Strona {currentPage} z {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Następne
        </button>
      </div>
    </div>
  );
}
