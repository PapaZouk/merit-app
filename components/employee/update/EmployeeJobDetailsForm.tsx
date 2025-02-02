import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {Employee} from "../../utils/api-client/types/Employee.ts";
import EmployeeUpdateForm from "./EmployeeUpdateForm.tsx";
import FormSelect from "../../forms/FormSelect.tsx";
import {status} from "../types/status.ts";
import {jobTitles} from "../types/jobTitles.ts";
import {departments} from "../types/departments.ts";
import FormInput from "../../forms/FormInput.tsx";
import {contractTypes} from "../types/contractTypes.ts";
import {workSchedules} from "../types/workSchedules.ts";
import {insuranceTypes} from "../types/insuranceTypes.ts";

type EmployeeJobDetailsFormProps = {
  employeeData: Employee;
  formData: {
    status: string;
    jobTitle: string;
    department: string;
    startDate: string;
    endDate: string | null;
    contractType: string;
    workSchedule: string;
    insuranceType: string;
    annualLeaveDays: number;
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

export default function EmployeeJobDetailsForm(
  {
    employeeData,
    formData,
    handleChange,
    handleSubmit,
  }: EmployeeJobDetailsFormProps,
) {
  return (
    <EmployeeUpdateForm
      employeeData={employeeData}
      subTitle={"Edytuj dane zawodowe"}
      handleSubmit={handleSubmit}
    >
      <>
        <div>
          <FormSelect
            htmlFor={"status"}
            text={"Status"}
            options={status}
            value={formData.status}
            handleChange={handleChange}
            defaultValue={"Wybierz status"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"jobTitle"}
            text={"Stanowisko"}
            options={jobTitles}
            value={formData.jobTitle}
            handleChange={handleChange}
            defaultValue={"Wybierz stanowisko"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"department"}
            text={"Dział"}
            options={departments}
            value={formData.department}
            handleChange={handleChange}
            defaultValue={"Wybierz dział"}
          />
        </div>
        <div>
          <FormInput
            type={"date"}
            name={"startDate"}
            value={formData.startDate}
            handleChange={handleChange}
            label={"Data zatrudnienia"}
          />
        </div>
        <div>
          <FormInput
            type={"date"}
            name={"endDate"}
            value={formData.endDate ?? "Brak danych"}
            handleChange={handleChange}
            label={"Data zakończenia pracy"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"contractType"}
            text={"Rodzaj umowy"}
            options={contractTypes}
            value={formData.contractType}
            handleChange={handleChange}
            defaultValue={"Wybierz rodzaj umowy"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"workSchedule"}
            text={"Grafik Pracy"}
            options={workSchedules}
            value={formData.workSchedule}
            handleChange={handleChange}
            defaultValue={"Wybierz typ grafiku pracy"}
          />
        </div>
        <div>
          <FormSelect
            htmlFor={"insuranceType"}
            text={"Typ ubezpieczenia"}
            options={insuranceTypes}
            value={formData.insuranceType}
            handleChange={handleChange}
            defaultValue={"Wybierz typ ubezpieczenia"}
          />
        </div>
        <div>
          <FormInput
            type={"number"}
            name={"annualLeaveDays"}
            value={formData.annualLeaveDays}
            handleChange={handleChange}
            label={"Dni urlopowe"}
          />
        </div>
      </>
    </EmployeeUpdateForm>
  );
}
