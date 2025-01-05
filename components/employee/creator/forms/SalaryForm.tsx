import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormInput from "../../forms/FormInput.tsx";
import FormSelect from "../../forms/FormSelect.tsx";
import { currencies } from "../../forms/utils/currencies.ts";

type SalaryFormProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  errors: { [key: string]: string };
};

export default function SalaryForm(
  { formData, handleChange, errors }: SalaryFormProps,
) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold">Wynagrodzenie</h2>
      <FormInput
        type={"number"}
        name={"baseSalary"}
        value={formData.baseSalary}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        min={0}
        label={"Wynagrodzenie podstawowe"}
        error={errors.baseSalary}
      />
      <FormSelect
        htmlFor={"currency"}
        text={"Waluta"}
        options={currencies}
        value={formData.currency}
        handleChange={handleChange}
        defaultValue={"Wybierz walutę"}
        className={"w-full p-2 border rounded"}
        error={errors.currency}
      />
      <FormInput
        type={"text"}
        name={"bankAccount"}
        value={formData.bankAccount}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        min={26}
        max={26}
        label={"Numer konta bankowego"}
        error={errors.bankAccount}
      />
      <FormInput
        type={"text"}
        name={"bankName"}
        value={formData.bankName}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Nazwa banku"}
        error={errors.bankName}
      />
    </div>
  );
}