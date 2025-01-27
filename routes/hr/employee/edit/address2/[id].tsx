import { PageProps } from "$fresh/server.ts";
import EmployeeUpdateAddress2 from "../../../../../islands/employees/edit/EmployeeUpdateAddress2.tsx";
import { LoginProvider } from "../../../../../components/context/LoginProvider.tsx";
import { NotificationsProvider } from "../../../../../components/context/NotificationsProvider.tsx";
import { formatRouteParam } from "../../../../../components/utils/formatter/formatRouteParam.ts";

export default function EditEmployeeAddress2(props: PageProps) {
  const id: string = formatRouteParam(props);
  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateAddress2 employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
