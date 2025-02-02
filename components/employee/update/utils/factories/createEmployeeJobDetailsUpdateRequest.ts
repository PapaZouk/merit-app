import { Employee } from "../../../../utils/api-client/types/Employee.ts";

type EmployeeJobDetailsFormState = {
  status: string;
  jobTitle: string;
  department: string;
  startDate: string;
  endDate: string | null;
  contractType: string;
  workSchedule: string;
  insuranceType: string;
  annualLeaveDays: number;
};

export const createEmployeeJobDetailsUpdateRequest = (
  formData: EmployeeJobDetailsFormState,
  employee: Employee,
  hasJobDetailsChanged: boolean,
) => {
  return {
    _id: employee._id,
    personalData: { ...employee.personalData },
    jobDetails: {
      ...employee.jobDetails,
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
          ...employee.jobDetails.jobDetailsHistory,
          {
            statusBefore: employee.jobDetails.status,
            statusAfter: formData.status,
            jobTitleBefore: employee.jobDetails.jobTitle,
            jobTitleAfter: formData.jobTitle,
            departmentBefore: employee.jobDetails.department,
            departmentAfter: formData.department,
            startDateBefore: employee.jobDetails.startDate,
            startDateAfter: formData.startDate,
            endDateBefore: employee.jobDetails.endDate,
            endDateAfter: formData.endDate,
            contractTypeBefore: employee.jobDetails.contractType,
            contractTypeAfter: formData.contractType,
            workScheduleBefore: employee.jobDetails.workSchedule,
            workScheduleAfter: formData.workSchedule,
            insuranceTypeBefore: employee.jobDetails.insuranceType,
            insuranceTypeAfter: formData.insuranceType,
            annualLeaveDaysBefore: employee.jobDetails.annualLeaveDays,
            annualLeaveDaysAfter: formData.annualLeaveDays,
            changeDate: new Date().toISOString(),
          },
        ]
        : employee.jobDetails.jobDetailsHistory,
    },
  };
};
