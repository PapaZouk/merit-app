import {h} from "preact";
import {mapTimesheetMonth} from "../mappers/mapTimesheetMonth.ts";

type TimesheetPeriodSelectorProps = {
  years: number[];
  months: number[];
  selectedYear: number | null;
  selectedMonth: number | null;
  handleYearChange: (e: h.JSX.TargetedEvent<HTMLSelectElement>) => void;
  handleMonthChange: (e: h.JSX.TargetedEvent<HTMLSelectElement>) => void;
};

export default function TimesheetPeriodSelector(
  {
    years,
    months,
    selectedYear,
    selectedMonth,
    handleYearChange,
    handleMonthChange,
  }: TimesheetPeriodSelectorProps,
): h.JSX.Element {
  return (
    <div class="flex flex-col md:flex-row mb-4">
      <div class="mb-4 md:mb-0 md:mr-4">
        <label htmlFor="year" class="text-gray-800 mr-2">Wybierz rok:</label>
        <select
          id="year"
          value={selectedYear ?? ""}
          onChange={handleYearChange}
          class="p-2 rounded bg-gray-200 text-gray-800 w-full md:w-auto"
        >
          <option value="" disabled>Rok...</option>
          {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
      {selectedYear && (
        <div>
          <label htmlFor="month" class="text-gray-800 mr-2">
            Wybierz miesiąc:
          </label>
          <select
            id="month"
            value={selectedMonth ?? ""}
            onChange={handleMonthChange}
            class="p-2 rounded bg-gray-200 text-gray-800 w-full md:w-auto"
          >
            <option value="" disabled>Miesiąc...</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {mapTimesheetMonth(month)}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
