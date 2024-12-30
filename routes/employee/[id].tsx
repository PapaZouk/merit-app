import {PageProps} from "$fresh/server.ts";
import {getEmployeeById} from "../../components/utils/api-client/client.ts";
import EmployeeDetails from "../../components/employee/employeeDetails.tsx";

export default async function EmployeeById(props: PageProps) {
  const id = new URL(props.url).pathname.split('/').filter(Boolean)[1];
  const employee = await getEmployeeById(id);
  const employeeData = employee.result;

  return (
    <div>
      <EmployeeDetails employeeData={employeeData} />
    </div>
  );
}