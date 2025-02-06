import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import { useEffect, useState } from "preact/hooks";
import Loader from "../../components/loader/loader.tsx";
import EmployeesTable from "./EmployeesTable.tsx";
import { EmployeeStatus } from "../../components/employee/types/EmployeeStatus.ts";
import { NotificationsProvider } from "../../components/context/NotificationsProvider.tsx";
import { useLogin } from "../../components/context/LoginProvider.tsx";

export default function EmployeesOverview() {
  const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);
  const { userId } = useLogin();

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
      const employeesResult = responseBody.result;

      const sortedEmployees = employeesResult
        .sort((a: Employee, b: Employee) => {
          if (a.personalData.lastName < b.personalData.lastName) {
            return -1;
          }
          if (a.personalData.lastName > b.personalData.lastName) {
            return 1;
          }
          return 0;
        })
        .sort((a: Employee, b: Employee) =>
          a.jobDetails.status === EmployeeStatus.ACTIVE ? -1 : 1
        );
      setSortedEmployees(sortedEmployees);
    }

    fetchEmployees();
  }, []);

  if (!sortedEmployees) {
    return <Loader />;
  }

  return (
    <NotificationsProvider userId={userId}>
      <EmployeesTable
        sortedEmployees={sortedEmployees}
        setSortedEmployees={setSortedEmployees}
      />
    </NotificationsProvider>
  );
}
