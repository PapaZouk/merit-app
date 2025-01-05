import {getEmployees} from "../components/utils/api-client/client.ts";
import {Employee} from "../components/utils/api-client/types/Employee.ts";
import {getConfig} from "../components/utils/api-client/config/getConfig.ts";
import {WidgetsLayout} from "../islands/layouts/WidgetsLayout.tsx";
import {LoginProvider} from "../islands/context/LoginProvider.tsx";
import {getAuthConfig} from "../islands/auth/getAuthConfig.ts";

export default async function Home() {
  const employees = await getEmployees();
  const employeesData = await employees.result as Employee[];
  const createConfig = getConfig();
  const authConfig = getAuthConfig();

  return (
    <LoginProvider authConfig={authConfig}>
      <WidgetsLayout employeesData={employeesData} config={createConfig} />
    </LoginProvider>
  );
}
