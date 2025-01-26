import {PageProps} from "$fresh/server.ts";
import EmployeeUpdatePersonalData from "../../../../../islands/employees/edit/EmployeeUpdatePersonalData.tsx";
import {NotificationsProvider} from "../../../../../components/context/NotificationsProvider.tsx";
import {LoginProvider} from "../../../../../components/context/LoginProvider.tsx";

export default function EditEmployeeById(props: PageProps) {
  const pathElements = new URL(props.url).pathname.split("/").filter(Boolean);
  const id: string = pathElements[pathElements.length - 1];

  return (
    <LoginProvider>
      <NotificationsProvider userId={id}>
        <EmployeeUpdatePersonalData employeeId={id} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
