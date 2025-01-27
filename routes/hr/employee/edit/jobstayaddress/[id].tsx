import { PageProps } from "$fresh/server.ts";
import EmployeeUpdateJobStayAddress from "../../../../../islands/employees/edit/EmployeeUpdateJobStayAddress.tsx";
import { NotificationsProvider } from "../../../../../components/context/NotificationsProvider.tsx";
import { LoginProvider } from "../../../../../components/context/LoginProvider.tsx";
import { formatRouteParam } from "../../../../../components/utils/formatter/formatRouteParam.ts";

export default function EditEmployeeJobStayAddress(props: PageProps) {
  const id: string = formatRouteParam(props);
  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateJobStayAddress employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
