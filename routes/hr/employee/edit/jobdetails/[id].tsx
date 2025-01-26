import {PageProps} from "$fresh/server.ts";
import EmployeeUpdateJobDetails from "../../../../../islands/employees/edit/EmployeeUpdateJobDetails.tsx";
import {LoginProvider} from "../../../../../components/context/LoginProvider.tsx";
import {NotificationsProvider} from "../../../../../components/context/NotificationsProvider.tsx";

export default function EditEmployeeJobDetails(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];

  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateJobDetails employeeId={id}/>
      </NotificationsProvider>
    </LoginProvider>
  );
}
