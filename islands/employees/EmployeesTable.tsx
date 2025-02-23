import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import { h } from "preact";
import { useState } from "preact/hooks";
import { Users } from "https://esm.sh/lucide-preact@latest";
import EmployeesOverviewTable from "../../components/employees/EmployeesOverviewTable.tsx";
import EmployeesOverviewTableNav from "../../components/employees/EmployeesOverviewTableNav.tsx";
import { sortEmployees } from "../../components/employees/utils/sortEmployees.tsx";
import Loader from "../../components/loader/loader.tsx";

type EmployeesTableProps = {
  sortedEmployees: Employee[];
  setSortedEmployees: (
    employees: (prevEmployees: Employee[]) => Employee[],
  ) => void;
};

export default function EmployeesTable(
  { sortedEmployees, setSortedEmployees }: EmployeesTableProps,
): h.JSX.Element {
  const [isLastNameAscending, setIsLastNameAscending] = useState<boolean>(true);
  const [isDepartmentAscending, setIsDepartmentAscending] = useState<boolean>(true);
  const [isJobTitleAscending, setIsJobTitleAscending] = useState<boolean>(true);
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const handleSort = (
    key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  ): void => {
    setSortedEmployees((prevEmployees: Employee[]) =>
      sortEmployees(prevEmployees, key, getOrder(key))
    );
    toggleOrder(key);
  };

  const handleShowArchived = () => {
    setShowArchived((prev) => !prev);
  }

  const getOrder = (key: string) => {
    if (key === "lastName") return isLastNameAscending;
    if (key === "department") return isDepartmentAscending;
    if (key === "jobTitle") return isJobTitleAscending;
    return true;
  };

  const toggleOrder = (key: string) => {
    if (key === "lastName") setIsLastNameAscending((prev) => !prev);
    if (key === "department") setIsDepartmentAscending((prev) => !prev);
    if (key === "jobTitle") setIsJobTitleAscending((prev) => !prev);
  };

  if (!sortedEmployees) {
    return <Loader />;
  }

  return (
    <div class="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 class="flex items-center text-gray-800 text-xl font-bold mb-2 md:mb-0">
          <Users class="mr-2 w-5 h-5 md:w-6 md:h-6" />
          Pracownicy
        </h1>
        <EmployeesOverviewTableNav handleSort={handleSort} handleShowArchived={handleShowArchived} />
      </div>
      <EmployeesOverviewTable employees={sortedEmployees} showArchived={showArchived} />
    </div>
  );
}
