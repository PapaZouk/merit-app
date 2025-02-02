import {Employee} from "../../../../utils/api-client/types/Employee.ts";

type EmployeeSalaryFormData = {
    baseSalary: number;
    currency: string;
    hourlyRate: number;
    bankAccount: string;
    bankName: string;
}

export const createEmployeeSalaryUpdateRequest = (
  formData: EmployeeSalaryFormData,
  employee: Employee,
  hasSalaryChanged: boolean,
) => {
  return {
    _id: employee._id,
    personalData: { ...employee.personalData },
    jobDetails: {
      ...employee.jobDetails,
      salary: {
        baseSalary: formData.baseSalary,
        currency: formData.currency,
        hourlyRate: formData.hourlyRate,
        bankAccount: formData.bankAccount,
        bankName: formData.bankName,
        salaryHistory: hasSalaryChanged
          ? [
            ...employee.jobDetails.salary.salaryHistory,
            {
              salaryBefore: employee.jobDetails.salary.baseSalary,
              salaryAfter: formData.baseSalary,
              hourlyRateBefore: employee.jobDetails.salary.hourlyRate,
              hourlyRateAfter: formData.hourlyRate,
              currencyBefore: employee.jobDetails.salary.currency,
              currencyAfter: formData.currency,
              bankAccountBefore: employee.jobDetails.salary.bankAccount,
              bankAccountAfter: formData.bankAccount,
              bankNameBefore: employee.jobDetails.salary.bankName,
              bankNameAfter: formData.bankName,
              changeDate: new Date().toISOString(),
            },
          ]
          : [...employee.jobDetails.salary.salaryHistory],
      },
    },
  };
};
