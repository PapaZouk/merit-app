import { PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { getEmployeeById } from "../../../../../components/utils/api-client/clients/employeeClient.ts";
import { Employee } from "../../../../../components/utils/api-client/types/Employee.ts";
import EmployeeUpdatePersonalData from "../../../../../islands/employees/edit/EmployeeUpdatePersonalData.tsx";
import { getApiConfig } from "../../../../../components/utils/api-client/config/getApiConfig.ts";
import { LoginProvider } from "../../../../../islands/context/LoginProvider.tsx";
import { getAuthConfig } from "../../../../../islands/auth/getAuthConfig.ts";
import { NotificationsProvider } from "../../../../../islands/context/NotificationsProvider.tsx";

export default async function EditEmployeeById(
  props: PageProps,
): Promise<h.JSX.Element | undefined> {
  const pathElements = new URL(props.url).pathname.split("/").filter(Boolean);
  const id: string = pathElements[pathElements.length - 1];
  const apiConfig = getApiConfig();
  const authConfig = getAuthConfig();

  const employee = await getEmployeeById(id);
  const employeeData = (await employee.result) as Employee;

  return (
    <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
      <NotificationsProvider userId={id} apiConfig={apiConfig}>
        <EmployeeUpdatePersonalData
          employeeData={employeeData}
          updateConfig={apiConfig}
        />
      </NotificationsProvider>
    </LoginProvider>
  );
}
