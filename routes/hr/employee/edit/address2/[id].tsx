import {PageProps} from "$fresh/server.ts";
import EmployeeUpdateAddress2 from "../../../../../islands/employees/edit/EmployeeUpdateAddress2.tsx";
import {LoginProvider} from "../../../../../components/context/LoginProvider.tsx";
import {NotificationsProvider} from "../../../../../components/context/NotificationsProvider.tsx";

export default function EditEmployeeAddress2(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];

  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateAddress2 employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
