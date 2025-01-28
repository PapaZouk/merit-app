import { h } from "preact";
import TimesheetOverview from "../../../islands/timesheet/TimesheetOverview.tsx";
import { LoginProvider } from "../../../components/context/LoginProvider.tsx";

export default function TimesheetOverviewPage(): h.JSX.Element {
  return (
    <LoginProvider>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 h-full w-full">
        <div class="col-span-3 bg-white p-4 shadow rounded-lg">
          <TimesheetOverview />
        </div>
      </div>
    </LoginProvider>
  );
}
