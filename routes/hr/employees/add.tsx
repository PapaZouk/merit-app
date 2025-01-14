import EmployeesManager from "../../../islands/employees/EmployeesManager.tsx";
import { getApiConfig } from "../../../components/utils/api-client/config/getApiConfig.ts";
import { getAuthConfig } from "../../../islands/auth/getAuthConfig.ts";

export default function AddEmployeePage() {
  const createConfig = getApiConfig();
  const authConfig = getAuthConfig();

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
      <div class="col-span-3 bg-white p-4 shadow rounded-lg">
        <EmployeesManager createConfig={createConfig} authConfig={{ config: authConfig}} />
      </div>
    </div>
  );
}
