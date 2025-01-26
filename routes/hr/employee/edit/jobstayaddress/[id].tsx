import {PageProps} from "$fresh/server.ts";
import EmployeeUpdateJobStayAddress from "../../../../../islands/employees/edit/EmployeeUpdateJobStayAddress.tsx";
import {NotificationsProvider} from "../../../../../components/context/NotificationsProvider.tsx";
import {LoginProvider} from "../../../../../components/context/LoginProvider.tsx";

export default function EditEmployeeJobStayAddress(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];

  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateJobStayAddress employeeId={id}/>
      </NotificationsProvider>
    </LoginProvider>
  );
}
