import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import { h } from "preact";
import { useState } from "preact/hooks";
import { Users } from "https://esm.sh/lucide-preact@latest";
import OverviewTable from "../../components/tables/overviewTable.tsx";
import OverviewTableNav from "../../components/tables/overviewTableNav.tsx";

type EmployeesTableProps = {
  sortedEmployees: Employee[];
  setSortedEmployees: (employees: (prevEmployees: Employee[]) => Employee[]) => void;
};

export default function EmployeesTable(
  { sortedEmployees, setSortedEmployees }: EmployeesTableProps,
): h.JSX.Element {
  const [isNameAscending, setIsNameAscending] = useState(true);
  const [isDepartmentAscending, setIsDepartmentAscending] = useState(true);
  const [isJobTitleAscending, setIsJobTitleAscending] = useState(true);

  const handleSort = (key: keyof Employee["personalData"] | keyof Employee["jobDetails"]): void => {
    setSortedEmployees((prevEmployees: Employee[]) => sortByKey(prevEmployees, key, getOrder(key)));
    toggleOrder(key);
  };

  const getOrder = (key: string) => {
    if (key === "firstName") return isNameAscending;
    if (key === "department") return isDepartmentAscending;
    if (key === "jobTitle") return isJobTitleAscending;
    return true;
  };

  const toggleOrder = (key: string) => {
    if (key === "firstName") setIsNameAscending((prev) => !prev);
    if (key === "department") setIsDepartmentAscending((prev) => !prev);
    if (key === "jobTitle") setIsJobTitleAscending((prev) => !prev);
  };

  return (
    <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 class="flex items-center text-white text-xl font-bold mb-2 md:mb-0">
          <Users class="mr-2 w-5 h-5 md:w-6 md:h-6" />
          Pracownicy
        </h1>
        <OverviewTableNav handleSort={handleSort} />
      </div>
      <OverviewTable employees={sortedEmployees} />
    </div>
  );
}

function sortByKey(sortedEmployees: Employee[], key: keyof Employee["personalData"] | keyof Employee["jobDetails"], isAscending: boolean) {
  return [...sortedEmployees].sort((a, b) => {
    const aValue = key in a.personalData ? a.personalData[key as keyof Employee["personalData"]] : a.jobDetails[key as keyof Employee["jobDetails"]];
    const bValue = key in b.personalData ? b.personalData[key as keyof Employee["personalData"]] : b.jobDetails[key as keyof Employee["jobDetails"]];

    if (aValue === null || aValue === undefined) return isAscending ? 1 : -1;
    if (bValue === null || bValue === undefined) return isAscending ? -1 : 1;

    if (aValue < bValue) {
      return isAscending ? -1 : 1;
    }
    if (aValue > bValue) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
}