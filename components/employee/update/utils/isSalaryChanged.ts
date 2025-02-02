import { Employee } from "../../../utils/api-client/types/Employee.ts";

type SalaryFormData = {
  baseSalary: number;
  currency: string;
  hourlyRate: number;
  bankAccount: string;
  bankName: string;
};

export const isSalaryChanged = (
  formData: SalaryFormData,
  employee: Employee,
): boolean => {
  const { salary } = employee.jobDetails;
  return (
    formData.baseSalary !== salary.baseSalary ||
    formData.currency !== salary.currency ||
    formData.hourlyRate !== salary.hourlyRate ||
    formData.bankAccount !== salary.bankAccount ||
    formData.bankName !== salary.bankName
  );
};
