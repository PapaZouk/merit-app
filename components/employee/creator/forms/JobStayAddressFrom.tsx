import { h } from "preact";
import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormInput from "../../../forms/FormInput.tsx";
import FormSelect from "../../../forms/FormSelect.tsx";
import { voivodeships } from "../../types/voivodeships.ts";
import { countries } from "../../types/countries.ts";

type JobStayAddressFromProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  errors: { [key: string]: string };
};

export default function JobStayAddressForm(
  { formData, handleChange, errors }: JobStayAddressFromProps,
): h.JSX.Element {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold">Nocleg</h2>
      <FormInput
        type={"text"}
        name={"jobStayAddressStreet"}
        value={formData.jobStayAddressStreet}
        handleChange={handleChange}
        label={"Ulica"}
        error={errors.jobStayAddressStreet}
      />
      <FormInput
        type={"text"}
        name={"jobStayAddressHouse"}
        value={formData.jobStayAddressHouse}
        handleChange={handleChange}
        label={"Numer domu"}
        error={errors.jobStayAddressHouse}
      />
      <FormInput
        type={"text"}
        name={"jobStayAddressCity"}
        value={formData.jobStayAddressCity}
        handleChange={handleChange}
        label={"Miasto"}
        error={errors.jobStayAddressCity}
      />
      <FormInput
        type={"text"}
        name={"jobStayAddressZip"}
        value={formData.jobStayAddressZip}
        handleChange={handleChange}
        label={"Kod pocztowy"}
        error={errors.jobStayAddressZip}
      />
      <FormSelect
        htmlFor={"jobStayAddressState"}
        text={"Państwo"}
        options={countries}
        value={formData.jobStayAddressState}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        extraValues={["Brak danych"]}
        defaultValue={"Polska"}
      />
      <FormSelect
        htmlFor={"jobStayAddressVoivodeship"}
        text={"Województwo"}
        options={voivodeships}
        value={formData.jobStayAddressVoivodeship}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        extraValues={["Brak danych"]}
        defaultValue={"Brak danych"}
        error={errors.jobStayAddressVoivodeship}
      />
    </div>
  );
}
