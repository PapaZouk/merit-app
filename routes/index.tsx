import {getEmployees} from "../components/utils/api-client/clients/employeeClient.ts";
import {Employee} from "../components/utils/api-client/types/Employee.ts";
import {getApiConfig} from "../components/utils/api-client/config/getApiConfig.ts";
import {WidgetsLayout} from "../islands/layouts/WidgetsLayout.tsx";
import {LoginProvider} from "../components/context/LoginProvider.tsx";

export default async function Home() {
  const employees = await getEmployees();
  const employeesData = await employees.result as Employee[];
  const apiConfig = getApiConfig();

  return (
    <LoginProvider apiConfig={apiConfig}>
      <WidgetsLayout employeesData={employeesData} config={apiConfig} />
    </LoginProvider>
  );
}
