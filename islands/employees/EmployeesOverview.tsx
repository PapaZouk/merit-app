import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import EmployeesTable from "../tables/employeesTable.tsx";
import { useState } from "preact/hooks";
import { getConfig } from "../../components/utils/api-client/config/getConfig.ts";

type EmployeesOverviewProps = {
  employees: Employee[];
  config: {
    url: string;
    token: string;
  };
};

export default function EmployeesOverview(
  { employees, config }: EmployeesOverviewProps,
) {
  const [sortedEmployees, setSortedEmployees] = useState<Employee[]>(employees);

  return (
    <div>
      <EmployeesTable
        sortedEmployees={sortedEmployees}
        setSortedEmployees={setSortedEmployees}
        config={config}
      />
    </div>
  );
}
