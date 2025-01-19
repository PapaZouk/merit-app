import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { updateEmployeeById } from "../../../components/utils/api-client/clients/employeeClient.ts";
import EmployeeJobDetailsForm from "../../../components/employee/forms/EmployeeJobDetailsForm.tsx";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import Popup from "../../../components/popup/popup.tsx";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";

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

    await updateEmployeeById(
      updatedData._id,
      updatedData,
      updateConfig.url,
      updateConfig.token,
    );

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
