import { Employee } from "../../utils/api-client/types/Employee.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { countries } from "./utils/countries.ts";
import { voivodeships } from "./utils/voivodeships.ts";
import UpdateForm from "./UpdateForm.tsx";
import FormInput from "./FormInput.tsx";
import FormSelect from "./FormSelect.tsx";

type EmployeeAddress2FormProps = {
  employeeData: Employee;
  formData: {
    street2: string | null;
    house2: string | null;
    city2: string | null;
    zip2: string | null;
    state2: string | null;
    voivodeship2: string | null;
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

export default function EmployeeAddress2Form({
  employeeData,
  formData,
  handleChange,
  handleSubmit,
}: EmployeeAddress2FormProps) {
  return (
    <UpdateForm
      employeeData={employeeData}
      subTitle={"Edytuj adres korespondencyjny"}
      handleSubmit={handleSubmit}
    >
      <>
        <div>
          <FormInput
            type={"text"}
            name={"street2"}
            value={formData.street2 || "Brak danych"}
            handleChange={handleChange}
            label={"Ulica"}
          />
        </div>
        <div>
          <FormInput
            type={"number"}
            name={"house2"}
            value={formData.house2 || "Brak danych"}
            handleChange={handleChange}
            label={"Numer domu"}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"city2"}
            value={formData.city2 || "Brak danych"}
            handleChange={handleChange}
            label={"Miasto"}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"zip2"}
            value={formData.zip2 || "Brak danych"}
            handleChange={handleChange}
            label={"Kod pocztowy"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"state2"}
            text={"Państwo"}
            options={countries}
            value={formData.state2 || "Brak danych"}
            handleChange={handleChange}
            defaultValue={"Wybierz państwo"}
            extraValues={["Brak danych"]}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"voivodeship2"}
            text={"Województwo"}
            options={voivodeships}
            value={formData.voivodeship2 || "Brak danych"}
            handleChange={handleChange}
            defaultValue={"Wybierz województwo"}
            extraValues={["Brak danych"]}
          />
        </div>
      </>
    </UpdateForm>
  );
}
