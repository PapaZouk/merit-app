import {PageProps} from "$fresh/server.ts";
import {getEmployeeById} from "../../../../../components/utils/api-client/client.ts";
import {Employee} from "../../../../../components/utils/api-client/types/Employee.ts";
import {getApiConfig} from "../../../../../components/utils/api-client/config/getApiConfig.ts";
import EmployeeUpdateJobDetails from "../../../../../islands/employees/edit/EmployeeUpdateJobDetails.tsx";

export default async function EditEmployeeJobDetails(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];
  const updateConfig = getApiConfig();

  const employee = await getEmployeeById(id);
  const employeeData = await employee.result as Employee;

  return (
    <EmployeeUpdateJobDetails
      employeeData={employeeData}
      updateConfig={updateConfig}
    />
  );
}
