import {PageProps} from "$fresh/server.ts";
import {getEmployeeById} from "../../../components/utils/api-client/client.ts";
import EmployeeDetails from "../../../islands/employees/employeeDetails.tsx";

export default async function EmployeeById(props: PageProps) {
  const pathElements = new URL(props.url).pathname.split('/').filter(Boolean);
  const id = pathElements[pathElements.length - 1];
  const employee = await getEmployeeById(id);
  const employeeData = employee.result;

  return (
    <div>
      <EmployeeDetails employeeData={employeeData} />
    </div>
  );
}