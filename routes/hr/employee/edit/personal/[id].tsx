import { PageProps } from "$fresh/server.ts";
import EmployeeUpdatePersonalData from "../../../../../islands/employees/edit/EmployeeUpdatePersonalData.tsx";
import { NotificationsProvider } from "../../../../../components/context/NotificationsProvider.tsx";
import { LoginProvider } from "../../../../../components/context/LoginProvider.tsx";
import { formatRouteParam } from "../../../../../components/utils/formatter/formatRouteParam.ts";

export default function EditEmployeeById(props: PageProps) {
  const id: string = formatRouteParam(props);
  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdatePersonalData employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
