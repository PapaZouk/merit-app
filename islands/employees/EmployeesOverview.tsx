import {Employee} from "../../components/utils/api-client/types/Employee.ts";
import EmployeesTable from "../tables/employeesTable.tsx";
import {useState} from "preact/hooks";

type EmployeesOverviewProps = {
  employees: Employee[];
};

export default function EmployeesOverview(
  { employees }: EmployeesOverviewProps,
) {
  const [sortedEmployees, setSortedEmployees] = useState<Employee[]>(employees);

  return (
    <div>
      <EmployeesTable
        sortedEmployees={sortedEmployees}
        setSortedEmployees={setSortedEmployees}
      />
    </div>
  );
}