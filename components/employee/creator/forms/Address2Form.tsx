import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormInput from "../../forms/FormInput.tsx";
import FormSelect from "../../forms/FormSelect.tsx";
import { countries } from "../../forms/utils/countries.ts";
import { voivodeships } from "../../forms/utils/voivodeships.ts";

type Address2FormProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  errors: { [key: string]: string };
};

export default function Address2Form(
  { formData, handleChange, errors }: Address2FormProps,
) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold">Adres korespondencyjny</h2>
      <FormInput
        type={"text"}
        name={"street2"}
        value={formData.street2}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Ulica"}
        error={errors.street2}
      />
      <FormInput
        type={"text"}
        name={"house2"}
        value={formData.house2}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Numer domu"}
        error={errors.house2}
      />
      <FormInput
        type={"text"}
        name={"city2"}
        value={formData.city2}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Miasto"}
        error={errors.city2}
      />
      <FormInput
        type={"text"}
        name={"zip2"}
        value={formData.zip2}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Kod pocztowy"}
        error={errors.zip2}
      />
      <FormSelect
        htmlFor={"state2"}
        text={"Państwo"}
        options={countries}
        value={formData.state2}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        extraValues={["Brak danych"]}
        defaultValue={"Brak danych"}
        error={errors.state2}
      />
      <FormSelect
        htmlFor={"voivodeship2"}
        text={"Województwo"}
        options={voivodeships}
        value={formData.voivodeship2}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        extraValues={["Brak danych"]}
        defaultValue={"Brak danych"}
        error={errors.voivodeship2}
      />
    </div>
  );
}