import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { useEffect, useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import EmployeeSalaryForm from "../../../components/employee/update/EmployeeSalaryForm.tsx";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import { EventNotificationCreateRequest } from "../../../components/utils/api-client/types/EventNotification.ts";
import { useLogin } from "../../../components/context/LoginProvider.tsx";
import { useNotifications } from "../../../components/context/NotificationsProvider.tsx";
import { emptyEmployeeData } from "../../../components/employee/utils/emptyEmployeeData.ts";
import { isSalaryChanged } from "../../../components/employee/update/utils/isSalaryChanged.ts";
import {
  createEmployeeSalaryUpdateRequest,
} from "../../../components/employee/update/utils/factories/createEmployeeSalaryUpdateRequest.ts";
import { handleChangeFormData } from "../../../components/employee/update/utils/handlers/handleChangeFormData.tsx";
import { EmployeeEventTagsEnum } from "../../../components/notifications/types/RoleTagsEnum.ts";

type EmployeeUpdateSalaryProps = {
  employeeId: string;
};

export default function EmployeeUpdateSalary(
  { employeeId }: EmployeeUpdateSalaryProps,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [formData, setFormData] = useState({
    baseSalary: employeeData.jobDetails.salary.baseSalary,
    currency: employeeData.jobDetails.salary.currency,
    hourlyRate: employeeData.jobDetails.salary.hourlyRate,
    bankAccount: employeeData.jobDetails.salary.bankAccount,
    bankName: employeeData.jobDetails.salary.bankName,
  });
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const { userId } = useLogin();
  const { addNewEventNotification } = useNotifications();

  useEffect(() => {
    if (!employeeId) {
      throw new Error("Missing employeeId");
    }

    async function fetchEmployee() {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch employee");
        return;
      }

      const responseBody = await response.json();
      setEmployeeData(responseBody.result);
      setFormData({
        baseSalary: responseBody.result.jobDetails.salary.baseSalary,
        currency: responseBody.result.jobDetails.salary.currency,
        hourlyRate: responseBody.result.jobDetails.salary.hourlyRate,
        bankAccount: responseBody.result.jobDetails.salary.bankAccount,
        bankName: responseBody.result.jobDetails.salary.bankName,
      });
    }

    fetchEmployee();
  }, []);

  const handleChange = (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => {
    handleChangeFormData(e, setFormData);
  };

  const handleUpdate = (
    e:
      | createElement.JSX.TargetedEvent<HTMLFormElement, Event>
      | MouseEventHandler<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    handlePopup();
  };

  const handlePopup = (): void => {
    setIsPopupOpened((prev) => !prev);
  };

  const confirmSubmit = async (): Promise<void> => {
    setIsPopupOpened(false);
    await handleSubmit(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
    );
  };

  const handleSubmit = async (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    const hasSalaryChanged = isSalaryChanged(formData, employeeData);

    const updatedData: Employee = createEmployeeSalaryUpdateRequest(
      formData,
      employeeData,
      hasSalaryChanged,
    );

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    addNewEventNotification(createEventNotification(
      userId,
      "Zmiana danych o wynagrodzeniu",
      `Zaktualizowano dane o wynagrodzeniu pracownika: ${updatedData.personalData.firstName} ${updatedData.personalData.lastName}`,
      "HR",
      [EmployeeEventTagsEnum.UPDATED],
    ));

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <>
      <EmployeeSalaryForm
        employeeData={employeeData}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
      />
      {isPopupOpened && (
        <ConfirmPopupEvent
          title={"Czy na pewno chcesz zapisać zmiany?"}
          onConfirm={confirmSubmit}
          onCancel={handlePopup}
        />
      )}
    </>
  );
}
