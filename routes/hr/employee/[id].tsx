import {PageProps} from "$fresh/server.ts";
import EmployeeDetails from "../../../islands/employees/employeeDetails.tsx";

export default function EmployeeById(props: PageProps) {
  const pathElements = new URL(props.url).pathname.split('/').filter(Boolean);
  const id = pathElements[pathElements.length - 1];

  return (
    <div>
      <EmployeeDetails employeeId={id} />
    </div>
  );
}