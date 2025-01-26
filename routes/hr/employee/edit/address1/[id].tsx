import {PageProps} from "$fresh/server.ts";
import EmployeeUpdateAddress1 from "../../../../../islands/employees/edit/EmployeeUpdateAddress1.tsx";
import {NotificationsProvider} from "../../../../../components/context/NotificationsProvider.tsx";
import {LoginProvider} from "../../../../../components/context/LoginProvider.tsx";

export default function EditEmployeeAddress1(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];

  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateAddress1 employeeId={id}/>
      </NotificationsProvider>
    </LoginProvider>
  );
}
