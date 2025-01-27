import { PageProps } from "$fresh/server.ts";
import EmployeeUpdateJobDetails from "../../../../../islands/employees/edit/EmployeeUpdateJobDetails.tsx";
import { LoginProvider } from "../../../../../components/context/LoginProvider.tsx";
import { NotificationsProvider } from "../../../../../components/context/NotificationsProvider.tsx";
import { formatRouteParam } from "../../../../../components/utils/formatter/formatRouteParam.ts";

export default function EditEmployeeJobDetails(props: PageProps) {
  const id: string = formatRouteParam(props);
  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateJobDetails employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
