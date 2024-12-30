import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {updateEmployeeById} from "../../../components/utils/api-client/client.ts";
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

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: { ...employeeData.personalData },
      jobDetails: {
        ...employeeData.jobDetails,
        salary: {
          baseSalary: formData.baseSalary,
          currency: formData.currency,
          bankAccount: formData.bankAccount,
          bankName: formData.bankName,
        },
      },
    };

    await updateEmployeeById(
      updatedData._id,
      updatedData,
      updateConfig.url,
      updateConfig.token,
    );

    globalThis.location.href = `/employee/${updatedData._id}`;
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
