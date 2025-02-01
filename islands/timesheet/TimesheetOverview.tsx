import { h } from "preact";
import { CalendarDays } from "https://esm.sh/lucide-preact@latest";
import { useEffect, useState } from "preact/hooks";
import {
  Days,
  Timesheet,
} from "../../components/utils/api-client/types/Timesheet.ts";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import TimesheetPeriodSelector from "../../components/timesheet/overview/TimesheetPeriodSelector.tsx";
import TimesheetOverviewTable from "../../components/timesheet/overview/TimesheetOverviewTable.tsx";
import Loader from "../../components/loader/loader.tsx";
import TimesheetOverviewController from "../../components/timesheet/overview/TimesheetOverviewController.tsx";
import PreviousButton from "../../components/buttons/PreviousButton.tsx";
import NextButton from "../../components/buttons/NextButton.tsx";
import { mapTimesheetMonth } from "../../components/timesheet/mappers/mapTimesheetMonth.ts";

export default function TimesheetOverview(): h.JSX.Element {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [timesheet, setTimesheet] = useState<Timesheet[] | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth() + 1,
  );
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

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

      const employeesResponse = await fetch("/api/employees/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!employeesResponse.ok) {
        console.error("Failed to fetch employees");
        return;
      }

      const employees: Employee[] = (await employeesResponse.json()).result;

      employees.forEach((employee: Employee) => {
        for (let month = 1; month <= 12; month++) {
          const existingTimesheet = timesheet.find((t: Timesheet) =>
            t.employeeId === employee._id && t.year === selectedYear &&
            t.month === month
          );

          if (!existingTimesheet) {
            timesheet.push({
              _id: `${employee._id}-${selectedYear}-${month}`,
              employeeId: employee._id,
              year: selectedYear,
              month: month,
              totalHours: { $numberDecimal: "0" },
              totalBalance: { $numberDecimal: "0" },
              days: [] as Days[],
            });
          }
        }
      });

      setYears(years);
      setMonths(Array.from({ length: 12 }, (_, i) => i + 1));
      setEmployees(employees);
      setTimesheet(timesheet);

      if (!selectedMonth) {
        setSelectedMonth(new Date().getMonth() + 1);
      }
    }

    fetchTimesheet();
  }, [selectedYear, setSelectedMonth]);

  const handleYearChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedYear(parseInt(target.value));
    setSelectedMonth(null); // Reset month selection when year changes
  };

  const handleMonthChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedMonth(parseInt(target.value));
  };

  const handleNextMonthChange = () => {
    if (selectedMonth) {
      if (selectedMonth >= 1 && selectedMonth <= 11) {
        setSelectedMonth(selectedMonth + 1);
      } else {
        setSelectedMonth(1);
        setSelectedYear(selectedYear + 1);
      }
    }
  };

  const handlePreviousMonthChange = () => {
    if (selectedMonth) {
      if (selectedMonth >= 2 && selectedMonth <= 12) {
        setSelectedMonth(selectedMonth - 1);
      } else {
        setSelectedMonth(12);
        setSelectedYear(selectedYear - 1);
      }
    }
  };

  const handleFilterEmployees = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    if (target.value === "Wszyscy") {
      setSelectedEmployee(null);
      return;
    }
    const employee = employees?.find((e: Employee) => e._id === target.value);
    setSelectedEmployee(employee || null);
  };

  const filteredTimesheet = timesheet
    ?.filter((t: Timesheet) =>
      t.year === selectedYear && t.month === selectedMonth &&
      (!selectedEmployee || t.employeeId === selectedEmployee._id)
    )
    .sort((a: Timesheet, b: Timesheet) => {
      return b.days.length - a.days.length;
    });

  if (!employees && !filteredTimesheet) {
    return <Loader />;
  }

  return (
    <div class="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <h1 class="flex items-center text-gray-800 text-xl font-bold mb-4">
        <CalendarDays class="mr-2 w-5 h-5" /> Przegląd grafików
      </h1>
      <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 mb-2">
        <TimesheetPeriodSelector
          years={years}
          months={months}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          handleYearChange={handleYearChange}
          handleMonthChange={handleMonthChange}
          key={selectedYear}
        />
        <TimesheetOverviewController
          existingEmployees={employees}
          setSelectedEmployee={handleFilterEmployees}
        />
      </div>
      <div class="flex justify-center items-center mb-4">
        <PreviousButton
          disabled={false}
          handlePrevious={handlePreviousMonthChange}
          isTextVisible={false}
        />
        <p>
          <strong>
            {mapTimesheetMonth(selectedMonth ?? new Date().getMonth())}{"  "}
            {selectedYear}
          </strong>
        </p>
        <NextButton
          handleNext={handleNextMonthChange}
          isTextVisible={false}
        />
      </div>
      {selectedYear && selectedMonth && filteredTimesheet && employees && (
        <TimesheetOverviewTable
          timesheet={filteredTimesheet}
          employees={selectedEmployee ? [selectedEmployee] : employees}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      )}
    </div>
  );
}
