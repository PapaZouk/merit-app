import {getEmployees} from "../components/utils/api-client/clients/employeeClient.ts";
import {Employee} from "../components/utils/api-client/types/Employee.ts";
import {getApiConfig} from "../components/utils/api-client/config/getApiConfig.ts";
import {WidgetsLayout} from "../islands/layouts/WidgetsLayout.tsx";
import {getAuthConfig} from "../components/utils/auth/auth-client/getAuthConfig.ts";
import {LoginProvider} from "../components/context/LoginProvider.tsx";

export default async function Home() {
  const employees = await getEmployees();
  const employeesData = await employees.result as Employee[];
  const apiConfig = getApiConfig();
  const authConfig = getAuthConfig();

  return (
    <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
      <WidgetsLayout employeesData={employeesData} config={apiConfig} />
    </LoginProvider>
  );
}
