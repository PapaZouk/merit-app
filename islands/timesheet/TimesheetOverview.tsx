import { h } from "preact";
import { CalendarDays } from "https://esm.sh/lucide-preact@latest";
import { useState } from "preact/hooks";
import { Timesheet } from "../../components/utils/api-client/types/Timesheet.ts";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import TimesheetPeriodSelector from "../../components/timesheet/overview/TimesheetPeriodSelector.tsx";
import TimesheetOverviewTable from "../../components/timesheet/overview/TimesheetOverviewTable.tsx";

type TimesheetOverviewProps = {
  timesheet: Timesheet[];
  employees: Employee[];
};

export default function TimesheetOverview(
  { timesheet, employees }: TimesheetOverviewProps,
): h.JSX.Element {
  const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(new Date().getMonth() + 1);

  const years = Array.from(new Set(timesheet.map((t) => t.year)));
  const months = Array.from(
    new Set(
      timesheet.filter((t) => t.year === selectedYear).map((t) => t.month),
    ),
  );

  const handleYearChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedYear(parseInt(target.value));
    setSelectedMonth(null); // Reset month selection when year changes
  };

  const handleMonthChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedMonth(parseInt(target.value));
  };

  const filteredTimesheet = timesheet.filter((t) =>
    t.year === selectedYear && t.month === selectedMonth
  );

  return (
    <div class="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <h1 class="flex items-center text-gray-800 text-xl font-bold mb-4">
        <CalendarDays class="mr-2 w-5 h-5" /> Przegląd grafików
      </h1>
      <TimesheetPeriodSelector
        years={years}
        months={months}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
        key={selectedYear}
      />
      {selectedYear && selectedMonth && (
        <TimesheetOverviewTable
          timesheet={filteredTimesheet}
          employees={employees}
        />
      )}
    </div>
  );
}