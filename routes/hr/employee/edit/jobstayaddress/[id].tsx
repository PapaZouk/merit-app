import { PageProps } from "$fresh/server.ts";
import {getApiConfig} from "../../../../../components/utils/api-client/config/getApiConfig.ts";
import {getEmployeeById} from "../../../../../components/utils/api-client/clients/employeeClient.ts";
import {Employee} from "../../../../../components/utils/api-client/types/Employee.ts";
import EmployeeUpdateJobStayAddress from "../../../../../islands/employees/edit/EmployeeUpdateJobStayAddress.tsx";

export default async function EditEmployeeJobStayAddress(pageProps: PageProps) {
    const pathElements = new URL(pageProps.url).pathname.split("/").filter(
        Boolean,
    );
    const id: string = pathElements[pathElements.length - 1];
    const updateConfig = getApiConfig();

    const employee = await getEmployeeById(id);
    const employeeData = await employee.result as Employee;

    return (
    <EmployeeUpdateJobStayAddress
        employeeData={employeeData}
        updateConfig={updateConfig}
    />
  );
}