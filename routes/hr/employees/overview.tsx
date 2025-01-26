import EmployeesOverview from "../../../islands/employees/EmployeesOverview.tsx";
import { getEmployees } from "../../../components/utils/api-client/clients/employeeClient.ts";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { getApiConfig } from "../../../components/utils/api-client/config/getApiConfig.ts";
import {getAuthConfig} from "../../../components/utils/auth/auth-client/getAuthConfig.ts";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default async function EmployeesOverviewPage() {
  const employees = await getEmployees();
  const employeesData = await employees.result as Employee[];

  const config = getApiConfig();
  const authConfig = getAuthConfig();
  const apiConfig = getApiConfig();

  return (
      <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
              <div class="col-span-3 bg-white p-4 shadow rounded-lg">
                  <EmployeesOverview employees={employeesData} config={config}/>
              </div>
          </div>
      </LoginProvider>
  );
}
