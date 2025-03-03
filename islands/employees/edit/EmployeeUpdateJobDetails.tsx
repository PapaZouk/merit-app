import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import {useEffect, useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import EmployeeJobDetailsForm from "../../../components/employee/update/EmployeeJobDetailsForm.tsx";
import {MouseEventHandler} from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmEventPopup from "../../../components/common/popup/custom/ConfirmEventPopup.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../../components/context/NotificationsProvider.tsx";
import {emptyEmployeeData} from "../../../components/employee/utils/emptyEmployeeData.ts";
import {isJobDetailsChanged} from "../../../components/employee/update/utils/isJobDetailsChanged.ts";
import {
  createEmployeeJobDetailsUpdateRequest,
} from "../../../components/employee/update/utils/factories/createEmployeeJobDetailsUpdateRequest.ts";
import {handleChangeFormData} from "../../../components/employee/update/utils/handlers/handleChangeFormData.tsx";
import {EmployeeEventTagsEnum} from "../../../components/notifications/types/RoleTagsEnum.ts";

type EmployeeUpdateSalaryProps = {
  employeeId: string;
};

export default function EmployeeUpdateSalary(
  { employeeId }: EmployeeUpdateSalaryProps,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [formData, setFormData] = useState({
    status: employeeData.jobDetails.status,
    jobTitle: employeeData.jobDetails.jobTitle,
    department: employeeData.jobDetails.department,
    startDate: employeeData.jobDetails.startDate,
    endDate: employeeData.jobDetails.endDate,
    contractType: employeeData.jobDetails.contractType,
    workSchedule: employeeData.jobDetails.workSchedule,
    insuranceType: employeeData.jobDetails.insuranceType,
    annualLeaveDays: employeeData.jobDetails.annualLeaveDays,
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
        status: responseBody.result.jobDetails.status,
        jobTitle: responseBody.result.jobDetails.jobTitle,
        department: responseBody.result.jobDetails.department,
        startDate: responseBody.result.jobDetails.startDate,
        endDate: responseBody.result.jobDetails.endDate,
        contractType: responseBody.result.jobDetails.contractType,
        workSchedule: responseBody.result.jobDetails.workSchedule,
        insuranceType: responseBody.result.jobDetails.insuranceType,
        annualLeaveDays: responseBody.result.jobDetails.annualLeaveDays,
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

    const hasJobDetailsChanged = isJobDetailsChanged(formData, employeeData);

    const updatedData: Employee = createEmployeeJobDetailsUpdateRequest(
      formData,
      employeeData,
      hasJobDetailsChanged,
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
      "Zmiana danych zawodowych",
      `Dane zawodowe pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione`,
      "HR",
      [EmployeeEventTagsEnum.UPDATED],
    ));

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <>
      <EmployeeJobDetailsForm
        employeeData={employeeData}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
      />
      {isPopupOpened && (
        <ConfirmEventPopup
          title={"Czy na pewno chcesz zapisać zmiany?"}
          onConfirm={confirmSubmit}
          onCancel={handlePopup}
        />
      )}
    </>
  );
}
