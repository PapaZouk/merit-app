import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import { h } from "preact";
import { useState } from "preact/hooks";
import { Users } from "https://esm.sh/lucide-preact@latest";
import OverviewTable from "../../components/tables/overviewTable.tsx";
import OverviewTableNav from "../../components/tables/overviewTableNav.tsx";
import { deleteEmployeeById } from "../../components/utils/api-client/client.ts";
import Popup from "../../components/popup/popup.tsx";
import { LoginProvider } from "../context/LoginProvider.tsx";

type EmployeesTableProps = {
  sortedEmployees: Employee[];
  setSortedEmployees: (
    employees: (prevEmployees: Employee[]) => Employee[],
  ) => void;
  config: {
    url: string;
    token: string;
  };
};

export default function EmployeesTable(
  { sortedEmployees, setSortedEmployees, config }: EmployeesTableProps,
): h.JSX.Element {
  const [isLastNameAscending, setIsLastNameAscending] = useState(true);
  const [isDepartmentAscending, setIsDepartmentAscending] = useState(true);
  const [isJobTitleAscending, setIsJobTitleAscending] = useState(true);
  const [confirmedDelete, setConfirmedDelete] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | null>(
    null,
  );

  const handleSort = (
    key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  ): void => {
    setSortedEmployees((prevEmployees: Employee[]) =>
      sortByKey(prevEmployees, key, getOrder(key))
    );
    toggleOrder(key);
  };

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

  const handlePopup = (): void => {
    setIsPopupOpened((prev) => !prev);
    setEmployeeIdToDelete(null);
  };

  const handleDelete = (id: string): void => {
    setIsPopupOpened((prev) => !prev);
    setEmployeeIdToDelete(id);
  };

  const confirmDelete = async (): Promise<void> => {
    if (employeeIdToDelete) {
      await deleteEmployeeById(employeeIdToDelete, config.url, config.token);
      setConfirmedDelete(true);
    }
  };

  const handleDecline = (): void => {
    setIsPopupOpened(false);
    setEmployeeIdToDelete(null);
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
      <OverviewTable employees={sortedEmployees} handleDelete={handleDelete} />
      {isPopupOpened && (
        <Popup onClose={() => setIsPopupOpened(false)}>
          <div class="p-4 space-y-4">
            <p class="mb-4 text-black">
              Czy na pewno chcesz usunąć pracownika?
            </p>
            <div class="flex space-x-4 justify-center">
              <button
                onClick={confirmDelete}
                class="px-4 py-2 bg-green-500 text-black rounded text-center"
              >
                Tak
              </button>
              <button
                onClick={handleDecline}
                class="px-4 py-2 bg-red-500 text-black rounded text-center"
              >
                Nie
              </button>
            </div>
          </div>
        </Popup>
      )}
      {confirmedDelete && globalThis.location.reload()}
    </div>
  );
}

function sortByKey(
  sortedEmployees: Employee[],
  key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  isAscending: boolean,
) {
  return [...sortedEmployees].sort((a, b) => {
    const aValue = key in a.personalData
      ? a.personalData[key as keyof Employee["personalData"]]
      : a.jobDetails[key as keyof Employee["jobDetails"]];
    const bValue = key in b.personalData
      ? b.personalData[key as keyof Employee["personalData"]]
      : b.jobDetails[key as keyof Employee["jobDetails"]];

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
