import { PageProps } from "$fresh/server.ts";
import TimesheetCalendar from "../../../../islands/timesheet/TimesheetCalendar.tsx";
import { formatRouteParam } from "../../../../components/utils/formatter/formatRouteParam.ts";

export default function TimesheetByYearAndMonth(props: PageProps) {
  const url = new URL(props.url);
  const employeeId = formatRouteParam(props);

  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");

  if (!year || !month) {
    throw new Error("Missing required query parameters");
  }

  const selectedYear = parseInt(year);
  const selectedMonth = parseInt(month);

  return (
    <div class="min-w-full w-full">
      <TimesheetCalendar
        employeeId={employeeId}
        year={selectedYear}
        month={selectedMonth}
      />
    </div>
  );
}
