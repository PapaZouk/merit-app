import { PageProps } from "$fresh/server.ts";
import EmployeeUpdateAddress1 from "../../../../../islands/employees/edit/EmployeeUpdateAddress1.tsx";
import { NotificationsProvider } from "../../../../../components/context/NotificationsProvider.tsx";
import { LoginProvider } from "../../../../../components/context/LoginProvider.tsx";
import { formatRouteParam } from "../../../../../components/utils/formatter/formatRouteParam.ts";

export default function EditEmployeeAddress1(pageProps: PageProps) {
  const id: string = formatRouteParam(pageProps);
  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateAddress1 employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
