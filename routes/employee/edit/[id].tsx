import {PageProps} from "$fresh/server.ts";
import {getEmployeeById} from "../../../components/utils/api-client/client.ts";

export default async function EditEmployeeById(props: PageProps) {
  const id: string = new URL(props.url).pathname.split('/').filter(Boolean)[2];
  const employee = await getEmployeeById(id);
  const employeeData = await employee.result;
  console.log(employeeData);

  return (
    <div>
      <h2>Edytuj pracownika</h2>
    </div>
  );
}