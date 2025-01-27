import { PageProps } from "$fresh/server.ts";
import EmployeeUpdateSalary from "../../../../../islands/employees/edit/EmployeeUpdateSalary.tsx";
import { LoginProvider } from "../../../../../components/context/LoginProvider.tsx";
import { NotificationsProvider } from "../../../../../components/context/NotificationsProvider.tsx";
import { formatRouteParam } from "../../../../../components/utils/formatter/formatRouteParam.ts";

export default function EditEmployeeSalary(props: PageProps) {
  const id: string = formatRouteParam(props);
  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateSalary employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
