import {PageProps} from "$fresh/server.ts";
import {h} from "preact";
import {getEmployeeById,} from "../../../../components/utils/api-client/client.ts";
import {Employee} from "../../../../components/utils/api-client/types/Employee.ts";
import EmployeeUpdatePersonalData from "../../../../islands/employees/edit/EmployeeUpdatePersonalData.tsx";
import {getConfig} from "../../../../components/utils/api-client/config/getConfig.ts";


export default async function EditEmployeeById(
    props: PageProps,
): Promise<h.JSX.Element | undefined> {
  const pathElements = new URL(props.url).pathname.split("/").filter(Boolean);
  const id: string = pathElements[pathElements.length - 1];
  const updateConfig = getConfig();

  const employee = await getEmployeeById(id);
  const employeeData = (await employee.result) as Employee;

  return (
      <EmployeeUpdatePersonalData
          employeeData={employeeData}
          updateConfig={updateConfig}
      />
  );
}
