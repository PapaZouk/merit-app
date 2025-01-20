import {getApiConfig} from "../../../components/utils/api-client/config/getApiConfig.ts";
import {getAuthConfig} from "../../../islands/auth/getAuthConfig.ts";
import {LoginProvider} from "../../../islands/context/LoginProvider.tsx";
import CreateNewEmployee from "../../../islands/employees/add/CreateNewEmployee.tsx";

export default function AddEmployeePage() {
  const apiConfig = getApiConfig();
  const authConfig = getAuthConfig();

  return (
      <LoginProvider authConfig={authConfig} apiConfig={apiConfig} >
          <CreateNewEmployee apiConfig={apiConfig} authConfig={authConfig} />
      </LoginProvider>
  );
}
