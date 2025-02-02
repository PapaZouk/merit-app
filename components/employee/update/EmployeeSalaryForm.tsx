import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import { currencies } from "../types/currencies.ts";
import EmployeeUpdateForm from "./EmployeeUpdateForm.tsx";
import FormInput from "../../forms/FormInput.tsx";
import FormSelect from "../../forms/FormSelect.tsx";

type EmployeeSalaryFormProps = {
  employeeData: Employee;
  formData: {
    baseSalary: number;
    currency: string;
    hourlyRate: number;
    bankAccount: string;
    bankName: string;
  };
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  handleSubmit: (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => void;
};

export default function EmployeeSalaryForm(
  {
    employeeData,
    formData,
    handleChange,
    handleSubmit,
  }: EmployeeSalaryFormProps,
) {
  return (
    <EmployeeUpdateForm
      employeeData={employeeData}
      subTitle={"Edytuj wynagrodzenie"}
      handleSubmit={handleSubmit}
    >
      <>
        <div>
          <FormInput
            type={"number"}
            name={"baseSalary"}
            value={formData.baseSalary}
            handleChange={handleChange}
            label={"Wynagrodzenie podstawowe"}
          />
        </div>
        <div>
        </div>
        <div>
          <FormSelect
            htmlFor={"currency"}
            text={"Waluta"}
            options={currencies}
            value={formData.currency || "PLN"}
            handleChange={handleChange}
            defaultValue={"Wybierz walutę"}
          />
        </div>
        <div>
          <FormInput
            type={"number"}
            name={"hourlyRate"}
            value={formData.hourlyRate}
            handleChange={handleChange}
            label={"Stawka godzinowa"}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"bankAccount"}
            value={formData.bankAccount}
            handleChange={handleChange}
            label={"Numer konta bankowego"}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"bankName"}
            value={formData.bankName}
            handleChange={handleChange}
            label={"Nazwa banku"}
          />
        </div>
      </>
    </EmployeeUpdateForm>
  );
}
