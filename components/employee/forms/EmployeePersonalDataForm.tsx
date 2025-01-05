import { h } from "preact";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import UpdateForm from "./UpdateForm.tsx";
import FormInput from "./FormInput.tsx";
import FormSelect from "./FormSelect.tsx";
import { clothSizes } from "./utils/clothSizes.ts";
import {namePattern, peselPattern, phonePattern} from "./utils/patterns.ts";

type EmployeePersonalDataFormProps = {
  employeeData: Employee;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    pesel: string;
    clothSize: string;
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

export default function EmployeePersonalDataForm(
  { employeeData, formData, handleChange, handleSubmit }:
    EmployeePersonalDataFormProps,
): h.JSX.Element {
  return (
    <UpdateForm
      employeeData={employeeData}
      subTitle={"Edytuj dane osobowe"}
      handleSubmit={handleSubmit}
    >
      <>
        <div>
          <FormInput
            type={"text"}
            name={"firstName"}
            value={formData.firstName || "Brak danych"}
            pattern={namePattern.source}
            handleChange={handleChange}
            label={"Imię"}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"lastName"}
            value={formData.lastName || "Brak danych"}
            pattern={namePattern.source}
            handleChange={handleChange}
            label={"Nazwisko"}
          />
        </div>
        <div>
          <FormInput
            type={"email"}
            name={"email"}
            value={formData.email || "nazwa@email.pl"}
            handleChange={handleChange}
            label={"E-mail"}
          />
        </div>
        <div>
          <FormInput
            type={"tel"}
            name={"phone"}
            value={formData.phone || "Brak danych"}
            handleChange={handleChange}
            label={"Telefon"}
            pattern={phonePattern.source}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"PESEL"}
            value={formData.pesel || "12345678901"}
            handleChange={handleChange}
            label={"PESEL"}
            pattern={peselPattern.source}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"clothSize"}
            text={"Rozmiar ubrań"}
            options={clothSizes}
            value={formData.clothSize}
            handleChange={handleChange}
            defaultValue={"Wybierz rozmiar"}
          />
        </div>
      </>
    </UpdateForm>
  );
}