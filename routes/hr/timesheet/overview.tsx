import { h } from 'preact';
import { LoginProvider } from "../../../islands/context/LoginProvider.tsx";
import { getAuthConfig } from "../../../islands/auth/getAuthConfig.ts";
import TimesheetOverview from "../../../islands/timesheet/TimesheetOverview.tsx";
import { getAllEmployeesWithIds, getAllTimesheet } from "../../../components/utils/api-client/client.ts";
import { Timesheet } from "../../../components/utils/api-client/types/Timesheet.ts";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";

export default async function TimesheetOverviewPage(): Promise<h.JSX.Element> {
  const cacheTimeout = Deno.env.get("CACHE_EXPIRATION");
  let allTimesheet: Timesheet[] = (await getAllTimesheet(cacheTimeout)).result as Timesheet[];

  if (!Array.isArray(allTimesheet)) {
    allTimesheet = [];
  }
  console.log(allTimesheet);

  const employeeIds = allTimesheet.map((timesheet: Timesheet) => timesheet.employeeId);

  const employees: Employee[] = await getAllEmployeesWithIds(
    employeeIds,
    cacheTimeout,
  ) as Employee[];

  const authConfig = getAuthConfig();

  return (
    <LoginProvider authConfig={authConfig}>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 h-full w-full">
        <div class="col-span-3 bg-white p-4 shadow rounded-lg">
          <TimesheetOverview timesheet={allTimesheet} employees={employees.result} />
        </div>
      </div>
    </LoginProvider>
  );
}