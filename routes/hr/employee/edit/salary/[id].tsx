import {PageProps} from "$fresh/server.ts";
import {getApiConfig} from "../../../../../components/utils/api-client/config/getApiConfig.ts";
import {getEmployeeById} from "../../../../../components/utils/api-client/client.ts";
import {Employee} from "../../../../../components/utils/api-client/types/Employee.ts";
import EmployeeUpdateSalary from "../../../../../islands/employees/edit/EmployeeUpdateSalary.tsx";

export default async function EditEmployeeSalary(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];
  const updateConfig = getApiConfig();

  const employee = await getEmployeeById(id);
  const employeeData = await employee.result as Employee;

  return (
    <EmployeeUpdateSalary
      employeeData={employeeData}
      updateConfig={updateConfig}
    />
  );
}