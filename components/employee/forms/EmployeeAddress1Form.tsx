import {Employee} from "../../utils/api-client/types/Employee.ts";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {countries} from "./utils/countries.ts";
import {voivodeships} from "./utils/voivodeships.ts";
import UpdateForm from "./UpdateForm.tsx";
import UpdateInput from "./UpdateInput.tsx";
import UpdateSelect from "./UpdateSelect.tsx";

type EmployeeAddress1FormProps = {
  employeeData: Employee;
  formData: {
    street1: string;
    house1: string;
    city1: string;
    zip1: string;
    state1: string;
    voivodeship1: string;
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

export default function EmployeeAddress1Form({
  employeeData,
  formData,
  handleChange,
  handleSubmit,
}: EmployeeAddress1FormProps) {
  return (
    <UpdateForm
      employeeData={employeeData}
      subTitle={"Edytuj adres zamieszkania"}
      handleSubmit={handleSubmit}
    >
      <>
        <div>
          <UpdateInput
            type={"text"}
            name={"street1"}
            value={formData.street1}
            handleChange={handleChange}
            label={"Ulica"}
          />
        </div>
        <div>
          <UpdateInput
            type={"number"}
            name={"house1"}
            value={formData.house1}
            handleChange={handleChange}
            label={"Numer domu"}
          />
        </div>
        <div>
          <UpdateInput
            type={"text"}
            name={"city1"}
            value={formData.city1}
            handleChange={handleChange}
            label={"Miasto"}
          />
        </div>
        <div>
          <UpdateInput
            type={"text"}
            name={"zip1"}
            value={formData.zip1}
            handleChange={handleChange}
            label={"Kod pocztowy"}
          />
        </div>
        <div>
          <UpdateSelect
            htmlFor={"state1"}
            text={"Państwo"}
            options={countries}
            value={formData.state1 || "Polska"}
            handleChange={handleChange}
            defaultValue={"Wybierz państwo"}
          />
        </div>
        <div>
          <UpdateSelect
            htmlFor={"voivodeship1"}
            text={"Województwo"}
            options={voivodeships}
            value={formData.voivodeship1 || "Pomorskie"}
            handleChange={handleChange}
            defaultValue={"Wybierz województwo"}
          />
        </div>
      </>
    </UpdateForm>
  );
}
