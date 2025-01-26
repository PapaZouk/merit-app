import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import {useEffect, useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import EmployeeJobDetailsForm from "../../../components/employee/forms/EmployeeJobDetailsForm.tsx";
import {MouseEventHandler} from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import {EventNotificationCreateRequest} from "../../../components/utils/api-client/types/EventNotification.ts";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../../components/context/NotificationsProvider.tsx";
import {emptyEmployeeData} from "../../../components/employee/utils/emptyEmployeeData.ts";

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
  const { userId, user } = useLogin();
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

    const hasJobDetailsChanged =
      formData.status !== employeeData.jobDetails.status ||
      formData.jobTitle !== employeeData.jobDetails.jobTitle ||
      formData.department !== employeeData.jobDetails.department ||
      formData.startDate !== employeeData.jobDetails.startDate ||
      formData.endDate !== employeeData.jobDetails.endDate ||
      formData.contractType !== employeeData.jobDetails.contractType ||
      formData.workSchedule !== employeeData.jobDetails.workSchedule ||
      formData.insuranceType !== employeeData.jobDetails.insuranceType ||
      formData.annualLeaveDays !== employeeData.jobDetails.annualLeaveDays;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: { ...employeeData.personalData },
      jobDetails: {
        ...employeeData.jobDetails,
        status: formData.status,
        jobTitle: formData.jobTitle,
        department: formData.department,
        startDate: formData.startDate,
        endDate: formData.endDate,
        contractType: formData.contractType,
        workSchedule: formData.workSchedule,
        insuranceType: formData.insuranceType,
        annualLeaveDays: formData.annualLeaveDays,
        jobDetailsHistory: hasJobDetailsChanged
          ? [
            ...employeeData.jobDetails.jobDetailsHistory,
            {
              statusBefore: employeeData.jobDetails.status,
              statusAfter: formData.status,
              jobTitleBefore: employeeData.jobDetails.jobTitle,
              jobTitleAfter: formData.jobTitle,
              departmentBefore: employeeData.jobDetails.department,
              departmentAfter: formData.department,
              startDateBefore: employeeData.jobDetails.startDate,
              startDateAfter: formData.startDate,
              endDateBefore: employeeData.jobDetails.endDate,
              endDateAfter: formData.endDate,
              contractTypeBefore: employeeData.jobDetails.contractType,
              contractTypeAfter: formData.contractType,
              workScheduleBefore: employeeData.jobDetails.workSchedule,
              workScheduleAfter: formData.workSchedule,
              insuranceTypeBefore: employeeData.jobDetails.insuranceType,
              insuranceTypeAfter: formData.insuranceType,
              annualLeaveDaysBefore: employeeData.jobDetails.annualLeaveDays,
              annualLeaveDaysAfter: formData.annualLeaveDays,
              changeDate: new Date().toISOString(),
            },
          ]
          : employeeData.jobDetails.jobDetailsHistory,
      },
    };

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const eventNotificationRequest: EventNotificationCreateRequest =
      createEventNotification(
        userId,
        "Zmiana danych zawodowych",
        `Dane zawodowe pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione`,
        "HR",
        user?.authId,
        ["hr", "hrmanager"],
      );

    addNewEventNotification(eventNotificationRequest);

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
        <ConfirmPopupEvent
          title={"Czy na pewno chcesz zapisać zmiany?"}
          onConfirm={confirmSubmit}
          onCancel={handlePopup}
        />
      )}
    </>
  );
}
