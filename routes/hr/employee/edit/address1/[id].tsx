import { PageProps } from "$fresh/server.ts";
import { getApiConfig } from "../../../../../components/utils/api-client/config/getApiConfig.ts";
import { getEmployeeById } from "../../../../../components/utils/api-client/clients/employeeClient.ts";
import { Employee } from "../../../../../components/utils/api-client/types/Employee.ts";
import EmployeeUpdateAddress1 from "../../../../../islands/employees/edit/EmployeeUpdateAddress1.tsx";
import {LoginProvider} from "../../../../../islands/context/LoginProvider.tsx";
import {getAuthConfig} from "../../../../../islands/auth/getAuthConfig.ts";

export default async function EditEmployeeAddress1(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];
  const apiConfig = getApiConfig();
  const authConfig = getAuthConfig();

  const employee = await getEmployeeById(id);
  const employeeData = await employee.result as Employee;

  return (
      <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
        <EmployeeUpdateAddress1
          employeeData={employeeData}
          updateConfig={apiConfig}
        />
      </LoginProvider>
  );
}
