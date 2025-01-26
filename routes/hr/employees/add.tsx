import {getApiConfig} from "../../../components/utils/api-client/config/getApiConfig.ts";
import CreateNewEmployee from "../../../islands/employees/add/CreateNewEmployee.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default function AddEmployeePage() {
  const apiConfig = getApiConfig();

  return (
      <LoginProvider>
          <CreateNewEmployee apiConfig={apiConfig} />
      </LoginProvider>
  );
}
