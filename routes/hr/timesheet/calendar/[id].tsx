import { PageProps } from "$fresh/server.ts";
import TimesheetCalendar from "../../../../components/timesheet/overview/TimesheetCalendar.tsx";
import { getTimesheetByEmployeeIdYearAndMonth } from "../../../../components/utils/api-client/client.ts";

export default async function TimesheetByYearAndMonth(props: PageProps) {
  const url = new URL(props.url);
  const pathElements = url.pathname.split("/").filter(Boolean);
  const employeeId = pathElements[pathElements.length - 1].split("?")[0];
  const selectedYear = parseInt(url.searchParams.get("year") || "2025");
  const selectedMonth = parseInt(url.searchParams.get("month") || "1", 10);

  const timesheet = await getTimesheetByEmployeeIdYearAndMonth(
    employeeId,
    selectedYear,
    selectedMonth,
  );
  console.log(timesheet);

  return (
    <div class="min-w-full w-full">
      <TimesheetCalendar
        timesheet={timesheet.result}
        year={selectedYear}
        month={selectedMonth}
      />
    </div>
  );
}
