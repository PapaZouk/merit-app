import {h} from "preact";
import {useLogin} from "../../components/context/LoginProvider.tsx";
import {HrWidgets} from "../widgets/HrWidgets.tsx";
import {FinWidgets} from "../widgets/FinWidgets.tsx";
import {AdminWidgets} from "../widgets/AdminWidgets.tsx";
import {UserRole, UserRoleEnum} from "../../components/utils/auth/types/userRoles.ts";

export function WidgetsLayout(): h.JSX.Element {
  const { userRoles } = useLogin();

  if (userRoles.includes(UserRoleEnum.FINANCE_MANAGER)) {
    return <FinWidgets />;
  }

  if ([UserRoleEnum.HR_MANAGER, UserRoleEnum.HR_EMPLOYEE].some(role => userRoles.includes(role as UserRole))) {
    return <HrWidgets />;
  }

  if (userRoles.includes(UserRoleEnum.ADMIN)) {
    return <AdminWidgets />;
  }

  return <div>Brak dostępu</div>;
}
