import { h } from "preact";
import { CalendarDays } from "https://esm.sh/lucide-preact@latest";
import { useEffect, useState } from "preact/hooks";
import { Timesheet } from "../../components/utils/api-client/types/Timesheet.ts";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import TimesheetPeriodSelector from "../../components/timesheet/overview/TimesheetPeriodSelector.tsx";
import TimesheetOverviewTable from "../../components/timesheet/overview/TimesheetOverviewTable.tsx";
import Loader from "../../components/loader/loader.tsx";

export default function TimesheetOverview(): h.JSX.Element {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [timesheet, setTimesheet] = useState<Timesheet[] | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth() + 1,
  );
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);

  useEffect(() => {
    async function fetchTimesheet() {
      const response = await fetch("/api/timesheet/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch timesheet");
        return;
      }

      const timesheet: Timesheet[] = (await response.json()).result;
      const years: number[] = Array.from(
        new Set(timesheet.map((t: Timesheet) => t.year)),
      );

      const queryIds: string = timesheet.map((t: Timesheet) => t.employeeId)
        .join(",");

      const employeesResponse = await fetch(
        `/api/employees/list/filter?ids=${queryIds}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!employeesResponse.ok) {
        console.error("Failed to fetch employees");
        return;
      }

      const employees = (await employeesResponse.json()).result;

      setYears(years);
      setMonths(Array.from({ length: 12 }, (_, i) => i + 1));
      setEmployees(employees);
      setTimesheet(timesheet);
      setSelectedYear(new Date().getFullYear());
      setSelectedMonth(new Date().getMonth() + 1);
    }

    if (!timesheet) {
      fetchTimesheet();
    }
  }, []);

  const handleYearChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedYear(parseInt(target.value));
    setSelectedMonth(null); // Reset month selection when year changes
  };

  const handleMonthChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedMonth(parseInt(target.value));
  };

  const filteredTimesheet = timesheet?.filter((t) =>
    t.year === selectedYear && t.month === selectedMonth
  );

  if (!employees && !timesheet) {
    return <Loader />;
  }

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
      {selectedYear && selectedMonth && filteredTimesheet && employees && (
        <TimesheetOverviewTable
          timesheet={filteredTimesheet}
          employees={employees}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      )}
    </div>
  );
}
