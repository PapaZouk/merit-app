import { h } from "preact";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import UpdateForm from "./UpdateForm.tsx";
import UpdateInput from "./UpdateInput.tsx";
import UpdateSelect from "./UpdateSelect.tsx";
import { clothSizes } from "./utils/clothSizes.ts";
import {peselPattern, phonePattern} from "./utils/patterns.ts";

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
          <UpdateInput
            type={"text"}
            name={"firstName"}
            value={formData.firstName || "Brak danych"}
            handleChange={handleChange}
            label={"Imię"}
          />
        </div>
        <div>
          <UpdateInput
            type={"text"}
            name={"lastName"}
            value={formData.lastName || "Brak danych"}
            handleChange={handleChange}
            label={"Nazwisko"}
          />
        </div>
        <div>
          <UpdateInput
            type={"email"}
            name={"email"}
            value={formData.email || "nazwa@email.pl"}
            handleChange={handleChange}
            label={"E-mail"}
          />
        </div>
        <div>
          <UpdateInput
            type={"tel"}
            name={"phone"}
            value={formData.phone || "Brak danych"}
            handleChange={handleChange}
            label={"Telefon"}
            pattern={phonePattern.source}
          />
        </div>
        <div>
          <UpdateInput
            type={"text"}
            name={"PESEL"}
            value={formData.pesel || "12345678901"}
            handleChange={handleChange}
            label={"PESEL"}
            pattern={peselPattern.source}
          />
        </div>
        <div>
          <UpdateSelect
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
