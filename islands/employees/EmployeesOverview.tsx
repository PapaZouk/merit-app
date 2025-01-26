import {Employee} from "../../components/utils/api-client/types/Employee.ts";
import EmployeesTable from "../tables/employeesTable.tsx";
import {useEffect, useState} from "preact/hooks";

export default function EmployeesOverview() {
  const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch("/api/employees/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

        if (!response.ok) {
            console.error("Failed to fetch employees");
            return;
        }

        const responseBody = await response.json();
        setSortedEmployees(responseBody.result);
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <EmployeesTable
        sortedEmployees={sortedEmployees}
        setSortedEmployees={setSortedEmployees}
      />
    </div>
  );
}
