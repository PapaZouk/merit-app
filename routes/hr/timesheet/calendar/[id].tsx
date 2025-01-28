import {PageProps} from "$fresh/server.ts";
import TimesheetCalendar from "../../../../islands/timesheet/TimesheetCalendar.tsx";
import {formatRouteParam} from "../../../../components/utils/formatter/formatRouteParam.ts";

export default function TimesheetByYearAndMonth(props: PageProps) {
  const url = new URL(props.url);
  const employeeId = formatRouteParam(props);
  const selectedYear = parseInt(
    url.searchParams.get("year") || new Date().getFullYear().toString(),
    10,
  );
  const selectedMonth = parseInt(
    url.searchParams.get("month") || "1",
    new Date().getMonth(),
  );

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
