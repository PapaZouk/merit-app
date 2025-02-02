import {Employee} from "../../../utils/api-client/types/Employee.ts";

type JobDetailsFormData = {
  status: string;
  jobTitle: string;
  department: string;
  startDate: string;
  endDate: string|null;
  contractType: string;
  workSchedule: string;
  insuranceType: string;
  annualLeaveDays: number;
};

export const isJobDetailsChanged = (
  formData: JobDetailsFormData,
  employee: Employee,
): boolean => {
  return formData.status !== employee.jobDetails.status ||
    formData.jobTitle !== employee.jobDetails.jobTitle ||
    formData.department !== employee.jobDetails.department ||
    formData.startDate !== employee.jobDetails.startDate ||
    formData.endDate !== employee.jobDetails.endDate ||
    formData.contractType !== employee.jobDetails.contractType ||
    formData.workSchedule !== employee.jobDetails.workSchedule ||
    formData.insuranceType !== employee.jobDetails.insuranceType ||
    formData.annualLeaveDays !== employee.jobDetails.annualLeaveDays;
};
