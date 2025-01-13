import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { updateEmployeeById } from "../../../components/utils/api-client/client.ts";
import EmployeeSalaryForm from "../../../components/employee/forms/EmployeeSalaryForm.tsx";

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
                }
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

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <EmployeeSalaryForm
      employeeData={employeeData}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
