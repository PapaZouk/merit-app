import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { updateEmployeeById } from "../../../components/utils/api-client/clients/employeeClient.ts";
import EmployeeSalaryForm from "../../../components/employee/forms/EmployeeSalaryForm.tsx";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {EventNotificationCreateRequest} from "../../../components/utils/api-client/types/EventNotification.ts";
import {useLogin} from "../../context/LoginProvider.tsx";
import {useNotifications} from "../../context/NotificationsProvider.tsx";

type EmployeeUpdateSalaryProps = {
  employeeData: Employee;
  updateConfig: {
    url: string;
    token: string;
  };
};

export default function EmployeeUpdateSalary(
  {
    employeeData,
    updateConfig,
  }: EmployeeUpdateSalaryProps,
) {
  const [formData, setFormData] = useState({
    baseSalary: employeeData.jobDetails.salary.baseSalary,
    currency: employeeData.jobDetails.salary.currency,
    hourlyRate: employeeData.jobDetails.salary.hourlyRate,
    bankAccount: employeeData.jobDetails.salary.bankAccount,
    bankName: employeeData.jobDetails.salary.bankName,
  });
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const { userId, user } = useLogin();
  const { addNewEventNotification } = useNotifications();

  const handleChange = (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    const hasSalaryChanged =
      formData.baseSalary !== employeeData.jobDetails.salary.baseSalary ||
      formData.currency !== employeeData.jobDetails.salary.currency ||
      formData.hourlyRate !== employeeData.jobDetails.salary.hourlyRate ||
      formData.bankAccount !== employeeData.jobDetails.salary.bankAccount ||
      formData.bankName !== employeeData.jobDetails.salary.bankName;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: { ...employeeData.personalData },
      jobDetails: {
        ...employeeData.jobDetails,
        salary: {
          baseSalary: formData.baseSalary,
          currency: formData.currency,
          hourlyRate: formData.hourlyRate,
          bankAccount: formData.bankAccount,
          bankName: formData.bankName,
          salaryHistory: hasSalaryChanged
            ? [
              ...employeeData.jobDetails.salary.salaryHistory,
              {
                salaryBefore: employeeData.jobDetails.salary.baseSalary,
                salaryAfter: formData.baseSalary,
                hourlyRateBefore: employeeData.jobDetails.salary.hourlyRate,
                hourlyRateAfter: formData.hourlyRate,
                currencyBefore: employeeData.jobDetails.salary.currency,
                currencyAfter: formData.currency,
                bankAccountBefore: employeeData.jobDetails.salary.bankAccount,
                bankAccountAfter: formData.bankAccount,
                bankNameBefore: employeeData.jobDetails.salary.bankName,
                bankNameAfter: formData.bankName,
                changeDate: new Date().toISOString(),
              },
            ]
            : [...employeeData.jobDetails.salary.salaryHistory],
        },
      },
    };

    await updateEmployeeById(
      updatedData._id,
      updatedData,
      updateConfig.url,
      updateConfig.token,
    );

    const eventNotificationRequest: EventNotificationCreateRequest = createEventNotification(
        userId,
        "Zmiana danych o wynagrodzeniu",
        `Zaktualizowano dane o wynagrodzeniu pracownika: ${updatedData.personalData.firstName} ${updatedData.personalData.lastName}`,
        "HR",
        user?.authId,
        ["hr", "manager"]
        );

    addNewEventNotification(eventNotificationRequest);

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
