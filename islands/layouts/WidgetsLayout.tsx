import { h } from "preact";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import { HrWidgets } from "../widgets/HrWidgets.tsx";
import { FinWidgets } from "../widgets/FinWidgets.tsx";
import { AdminWidgets } from "../widgets/AdminWidgets.tsx";
import {UserRoleEnum} from "../../components/utils/auth/types/userRoles.ts";

type WidgetsLayoutProps = {
  employeesData: Employee[];
  config: {
    url: string;
    token: string;
  };
};

export function WidgetsLayout({ employeesData, config }: WidgetsLayoutProps): h.JSX.Element {
  const { userRoles } = useLogin();

  if (userRoles.includes(UserRoleEnum.FINANCE_MANAGER)) {
    return <FinWidgets />;
  }

  if ([UserRoleEnum.HR_MANAGER, UserRoleEnum.HR_EMPLOYEE].some(role => userRoles.includes(role as UserRoleEnum))) {
    return <HrWidgets employeesData={employeesData} config={config} />;
  }

  if (userRoles.includes(UserRoleEnum.ADMIN)) {
    return <AdminWidgets />;
  }

  return <div>Brak dostępu</div>;
}
