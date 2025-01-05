import EmployeesManager from "../../../islands/employees/EmployeesManager.tsx";
import { getConfig } from "../../../components/utils/api-client/config/getConfig.ts";

export default function AddEmployeePage() {
  const createConfig = getConfig();

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
      <div class="col-span-3 bg-white p-4 shadow rounded-lg">
        <EmployeesManager createConfig={createConfig} />
      </div>
    </div>
  );
}
