import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormInput from "../../forms/FormInput.tsx";
import FormSelect from "../../forms/FormSelect.tsx";
import { countries } from "../../forms/utils/countries.ts";
import { voivodeships } from "../../forms/utils/voivodeships.ts";

type Address1FormProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  errors: { [key: string]: string };
};

export default function Address1Form(
  { formData, handleChange, errors }: Address1FormProps,
) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold">Adres zamieszkania</h2>
      <FormInput
        type={"text"}
        name={"street1"}
        value={formData.street1}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Ulica"}
        error={errors.street1}
      />
      <FormInput
        type={"text"}
        name={"house1"}
        value={formData.house1}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Numer domu"}
        error={errors.house1}
      />
      <FormInput
        type={"text"}
        name={"city1"}
        value={formData.city1}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Miasto"}
        error={errors.city1}
      />
      <FormInput
        type={"text"}
        name={"zip1"}
        value={formData.zip1}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Kod pocztowy"}
        error={errors.zip1}
      />
      <FormSelect
        htmlFor={"state1"}
        text={"Państwo"}
        options={countries}
        value={formData.state1}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        extraValues={["Brak danych"]}
        defaultValue={"Polska"}
        error={errors.state1}
      />
      <FormSelect
        htmlFor={"voivodeship1"}
        text={"Województwo"}
        options={voivodeships}
        value={formData.voivodeship1}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        extraValues={["Brak danych"]}
        defaultValue={"Pomorskie"}
        error={errors.voivodeship1}
      />
    </div>
  );
}