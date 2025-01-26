import EmployeesOverview from "../../../islands/employees/EmployeesOverview.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default function EmployeesOverviewPage() {
  return (
      <LoginProvider>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
              <div class="col-span-3 bg-white p-4 shadow rounded-lg">
                  <EmployeesOverview />
              </div>
          </div>
      </LoginProvider>
  );
}
