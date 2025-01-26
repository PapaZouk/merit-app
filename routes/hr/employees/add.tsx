import {getApiConfig} from "../../../components/utils/api-client/config/getApiConfig.ts";
import {getAuthConfig} from "../../../components/utils/auth/auth-client/getAuthConfig.ts";
import CreateNewEmployee from "../../../islands/employees/add/CreateNewEmployee.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default function AddEmployeePage() {
  const apiConfig = getApiConfig();
  const authConfig = getAuthConfig();

  return (
      <LoginProvider authConfig={authConfig} apiConfig={apiConfig} >
          <CreateNewEmployee apiConfig={apiConfig} authConfig={authConfig} />
      </LoginProvider>
  );
}
