import {PageProps} from "$fresh/server.ts";
import EmployeeDetails from "../../../islands/employees/employeeDetails.tsx";
import {formatRouteParam} from "../../../components/utils/formatter/formatRouteParam.ts";

export default function EmployeeById(props: PageProps) {
  const id = formatRouteParam(props);
  return (
    <div>
      <EmployeeDetails employeeId={id} />
    </div>
  );
}