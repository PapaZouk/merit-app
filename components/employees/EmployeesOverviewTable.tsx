import { UserX } from "https://esm.sh/lucide-preact@latest";
import { Employee } from "../utils/api-client/types/Employee.ts";
import { useState } from "preact/hooks";
import CheckButton from "../buttons/CheckButton.tsx";
import { getJobTitle } from "../employee/mappers/getJobTitleMapper.ts";
import { getDepartment } from "../employee/mappers/getDepartmentMapper.ts";
import { UserRoleEnum } from "../utils/auth/types/userRoles.ts";
import { useLogin } from "../context/LoginProvider.tsx";
import ArchiveButton from "../buttons/ArchiveButton.tsx";
import { EmployeeStatus } from "../employee/types/EmployeeStatus.ts";
import Popup from "../popup/popup.tsx";
import ConfirmAction from "../popup/ConfirmAction.tsx";
import PaginationNavigation from "../tables/PaginationNavigation.tsx";
import createEventNotification from "../utils/api-client/notifications/createEventNotification.ts";
import { useNotifications } from "../context/NotificationsProvider.tsx";
import {EmployeeEventTagsEnum, RoleTagsEnum} from "../notifications/types/RoleTagsEnum.ts";

type OverviewTableProps = {
  employees: Employee[];
  showArchived: boolean;
};

export default function EmployeesOverviewTable(
  { employees, showArchived }: OverviewTableProps,
) {
  const { userId, userRoles, validateUserRoles } = useLogin();
  const { addNewEventNotification } = useNotifications();
  const [employeeIdToArchive, setEmployeeIdToArchive] = useState<string | null>(
    null,
  );
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const employeesPerPage = 8;
  const indexOfLastTimesheet = currentPage * employeesPerPage;
  const indexOfFirstTimesheet = indexOfLastTimesheet - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstTimesheet,
    indexOfLastTimesheet,
  );
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleArchiveEmployee = async (): Promise<void> => {
    try {
      const employeeToArchive = employees.find((employee: Employee) =>
        employee._id === employeeIdToArchive
      );

      if (!employeeToArchive) {
        throw new Error("Employee not found");
      }

      employeeToArchive.jobDetails.status = EmployeeStatus.ARCHIVED;

      await fetch(`/api/employees/update/${employeeToArchive._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeToArchive),
      });

      addNewEventNotification(createEventNotification(
        userId,
        "Pracownik został zarchiwizowany",
        `Pracownik ${employeeToArchive.personalData.firstName} ${employeeToArchive.personalData.lastName} został zarchiwizowany`,
        "HR - Pracownicy",
        [RoleTagsEnum.HR, RoleTagsEnum.HR_MANAGER, EmployeeEventTagsEnum.ARCHIVED],
      ));

      globalThis.location.reload();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleArchivePopup = (id: string): void => {
    setIsPopupOpened(true);
    setEmployeeIdToArchive(id);
  };

  const handleConfirmArchive = async (): Promise<void> => {
    setIsPopupOpened(false);
    if (!employeeIdToArchive) {
      throw new Error("Employee ID not set");
    }
    await handleArchiveEmployee();
  };

  const handleDecline = (): void => {
    setIsPopupOpened(false);
  };

  return (
    <div class="overflow-x-auto">
      <table class="min-w-full bg-gray-100 rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-300 text-gray-800">
            <th class="py-2 px-4 text-left">Imię</th>
            <th class="py-2 px-4 text-left">Nazwisko</th>
            <th class="py-2 px-4 text-left hidden lg:table-cell">Stanowisko</th>
            <th class="py-2 px-4 text-left hidden lg:table-cell">Dział</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees && currentEmployees.map((employee: Employee) => {
            const archived =
              employee.jobDetails.status === EmployeeStatus.ARCHIVED;

            if (!showArchived && archived) {
              return null;
            }

            return (
              <tr
                key={employee._id}
                class={`border-b border-gray-300 text-gray-800 hover:bg-gray-200 ${
                  archived ? "bg-gray-200 line-through text-gray-500" : ""
                }`}
              >
                <td class="py-2 px-4">{employee.personalData.firstName}</td>
                <td class="py-2 px-4">{employee.personalData.lastName}</td>
                <td class="py-2 px-4 hidden lg:table-cell">
                  {getJobTitle(employee.jobDetails.jobTitle)}
                </td>
                <td class="py-2 px-4 hidden lg:table-cell">
                  {getDepartment(employee.jobDetails.department)}
                </td>
                <td class="py-2 px-4">
                  <CheckButton href={`/hr/employee/${employee._id}`} />
                </td>
                {validateUserRoles(userRoles, [
                  UserRoleEnum.ADMIN,
                  UserRoleEnum.HR_MANAGER,
                ]) && (
                  archived
                    ? (
                      <td class="lg:table-cell flex justify-center items-center">
                        <UserX
                          size={24}
                          class="opacity-50 cursor-not-allowed md:ml-4"
                        />
                      </td>
                    )
                    : (
                      <td class="lg:table-cell flex justify-center items-center">
                        <ArchiveButton
                          handleArchive={() => handleArchivePopup(employee._id)}
                          extraClasses={archived
                            ? "opacity-50 cursor-not-allowed"
                            : ""}
                          disabled={archived}
                        />
                      </td>
                    )
                )}
                {isPopupOpened && (
                  <Popup onClose={() => setIsPopupOpened(false)}>
                    <ConfirmAction
                      handleConfirm={handleConfirmArchive}
                      handleDecline={handleDecline}
                      message={"Czy na pewno chcesz zarchiwizować tego pracownika?"}
                    />
                  </Popup>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationNavigation
        currentPage={currentPage}
        totalPages={showArchived ? totalPages : Math.ceil(
          employees.filter((employee) =>
            employee.jobDetails.status !== EmployeeStatus.ARCHIVED
          ).length / employeesPerPage,
        )}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
}
