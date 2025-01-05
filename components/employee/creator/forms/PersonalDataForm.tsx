import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormInput from "../../forms/FormInput.tsx";
import { namePattern, peselPattern, phonePattern } from "../../forms/utils/patterns.ts";
import FormSelect from "../../forms/FormSelect.tsx";
import { clothSizes } from "../../forms/utils/clothSizes.ts";

type PersonalDataFormProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  errors: { [key: string]: string };
};

export default function PersonalDataForm(
  { formData, handleChange, errors }: PersonalDataFormProps,
) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold">Dane osobowe</h2>
      <FormInput
        type={"text"}
        name={"firstName"}
        value={formData.firstName}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        pattern={namePattern.source}
        label={"Imię"}
        required={true}
        error={errors.firstName}
      />
      <FormInput
        type={"text"}
        name={"lastName"}
        value={formData.lastName}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        pattern={namePattern.source}
        label={"Nazwisko"}
        error={errors.lastName}
      />
      <FormInput
        type={"email"}
        name={"email"}
        value={formData.email}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"E-mail"}
        error={errors.email}
      />
      <FormInput
        type={"text"}
        name={"phone"}
        value={formData.phone}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        pattern={phonePattern.source}
        label={"Telefon"}
        error={errors.phone}
      />
      <FormInput
        type={"text"}
        name={"pesel"}
        value={formData.pesel}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        pattern={peselPattern.source}
        label={"PESEL"}
        error={errors.pesel}
      />
      <FormSelect
        htmlFor={"clothSize"}
        text={"Rozmiar ubrań"}
        options={clothSizes}
        value={formData.clothSize}
        handleChange={handleChange}
        defaultValue={"Wybierz rozmiar"}
        className={"w-full p-2 border rounded"}
      />
    </div>
  );
}