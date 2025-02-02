import { Employee } from "../../utils/api-client/types/Employee.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import EmployeeUpdateForm from "./EmployeeUpdateForm.tsx";
import FormInput from "../../forms/FormInput.tsx";
import FormSelect from "../../forms/FormSelect.tsx";
import { countries } from "../types/countries.ts";
import { voivodeships } from "../types/voivodeships.ts";

type EmployeeJobStayAddressFormProps = {
  employeeData: Employee;
  formData: {
    jobStayAddressStreet: string | null;
    jobStayAddressHouse: string | null;
    jobStayAddressCity: string | null;
    jobStayAddressZip: string | null;
    jobStayAddressState: string | null;
    jobStayAddressVoivodeship: string | null;
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

export default function EmployeeJobStayAddressForm({
  employeeData,
  formData,
  handleChange,
  handleSubmit,
}: EmployeeJobStayAddressFormProps) {
  return (
    <EmployeeUpdateForm
      employeeData={employeeData}
      subTitle={"Edytuj adres noclegu"}
      handleSubmit={handleSubmit}
    >
      <>
        <div>
          <FormInput
            type={"text"}
            name={"jobStayAddressStreet"}
            value={formData.jobStayAddressStreet || "Brak danych"}
            handleChange={handleChange}
            label={"Ulica"}
          />
        </div>
        <div>
          <FormInput
            type={"number"}
            name={"jobStayAddressHouse"}
            value={formData.jobStayAddressHouse || "Brak danych"}
            handleChange={handleChange}
            label={"Numer domu"}
          />
        </div>
        <div>
          <FormInput
            type={"text"}
            name={"jobStayAddressCity"}
            value={formData.jobStayAddressCity || "Brak danych"}
            handleChange={handleChange}
            label={"Miasto"}
          />
        </div>
        <div>
          <FormInput
            type={"string"}
            name={"jobStayAddressZip"}
            value={formData.jobStayAddressZip || "Brak danych"}
            handleChange={handleChange}
            label={"Kod pocztowy"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"jobStayAddressState"}
            text={"Państwo"}
            options={countries}
            value={formData.jobStayAddressState ?? "Brak danych"}
            handleChange={handleChange}
            defaultValue={"Brak danych"}
            extraValues={["Brak danych"]}
          />
        </div>
        <FormSelect
          htmlFor={"jobStayAddressVoivodeship"}
          text={"Województwo"}
          options={voivodeships}
          value={formData.jobStayAddressVoivodeship ?? "Brak danych"}
          handleChange={handleChange}
          defaultValue={"Brak danych"}
          extraValues={["Brak danych"]}
        />
      </>
    </EmployeeUpdateForm>
  );
}
