import EmployeesOverview from "../../../islands/employees/EmployeesOverview.tsx";
import { getEmployees } from "../../../components/utils/api-client/client.ts";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { getConfig } from "../../../components/utils/api-client/config/getConfig.ts";
import {LoginProvider} from "../../../islands/context/LoginProvider.tsx";
import {getAuthConfig} from "../../../islands/auth/getAuthConfig.ts";

export default async function EmployeesOverviewPage() {
  const employees = await getEmployees();
  const employeesData = await employees.result as Employee[];

  const config = getConfig();
  const authConfig = getAuthConfig();

  return (
      <LoginProvider authConfig={authConfig}>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
              <div class="col-span-3 bg-white p-4 shadow rounded-lg">
                  <EmployeesOverview employees={employeesData} config={config}/>
              </div>
          </div>
      </LoginProvider>
  );
}
