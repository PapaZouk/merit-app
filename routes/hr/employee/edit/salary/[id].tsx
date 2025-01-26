import {PageProps} from "$fresh/server.ts";
import EmployeeUpdateSalary from "../../../../../islands/employees/edit/EmployeeUpdateSalary.tsx";
import {LoginProvider} from "../../../../../components/context/LoginProvider.tsx";
import {NotificationsProvider} from "../../../../../components/context/NotificationsProvider.tsx";

export default function EditEmployeeSalary(pageProps: PageProps) {
  const pathElements = new URL(pageProps.url).pathname.split("/").filter(
    Boolean,
  );
  const id: string = pathElements[pathElements.length - 1];

  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdateSalary employeeId={id}/>
      </NotificationsProvider>
    </LoginProvider>
  );
}
