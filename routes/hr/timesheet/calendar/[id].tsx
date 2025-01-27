import { PageProps } from "$fresh/server.ts";
import TimesheetCalendar from "../../../../islands/timesheet/TimesheetCalendar.tsx";
import { getTimesheetByEmployeeIdYearAndMonth } from "../../../../components/utils/api-client/clients/timesheetClient.ts";
import { getApiConfig } from "../../../../components/utils/api-client/config/getApiConfig.ts";
import { formatRouteParam } from "../../../../components/utils/formatter/formatRouteParam.ts";

export default async function TimesheetByYearAndMonth(props: PageProps) {
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
  const apiConfig = getApiConfig();

  const timesheet = await getTimesheetByEmployeeIdYearAndMonth(
    employeeId,
    selectedYear,
    selectedMonth,
  );

  return (
    <div class="min-w-full w-full">
      <TimesheetCalendar
        employeeId={employeeId}
        timesheet={timesheet.result}
        year={selectedYear}
        month={selectedMonth}
        apiConfig={apiConfig}
      />
    </div>
  );
}
