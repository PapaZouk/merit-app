import { h } from "preact";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import { useLogin } from "../context/LoginProvider.tsx";
import { HrWidgets } from "../widgets/HrWidgets.tsx";
import { FinWidgets } from "../widgets/FinWidgets.tsx";
import { AdminWidgets } from "../widgets/AdminWidgets.tsx";

type WidgetsLayoutProps = {
  employeesData: Employee[];
  config: {
    url: string;
    token: string;
  };
};

export function WidgetsLayout({ employeesData, config }: WidgetsLayoutProps): h.JSX.Element {
  const { userRole } = useLogin();

  if (userRole === "finmanager") {
    return <FinWidgets />;
  }

  if (userRole === "hrmanager") {
    return <HrWidgets employeesData={employeesData} config={config} />;
  }

  if (userRole === "admin") {
    return <AdminWidgets />;
  }

  return <div>Brak dostępu</div>;
}
