import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormSelect from "../../forms/FormSelect.tsx";
import { status } from "../../forms/utils/status.ts";
import { jobTitles } from "../../forms/utils/jobTitles.ts";
import { departments } from "../../forms/utils/departments.ts";
import FormInput from "../../forms/FormInput.tsx";
import { contractTypes } from "../../forms/utils/contractTypes.ts";
import { workSchedules } from "../../forms/utils/workSchedules.ts";
import { insuranceTypes } from "../../forms/utils/insuranceTypes.ts";

type JobDetailsFormProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  errors: { [key: string]: string };
};

export default function JobDetailsForm(
  { formData, handleChange, errors }: JobDetailsFormProps,
) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold">Dane zawodowe</h2>
      <FormSelect
        htmlFor={"status"}
        text={"Status"}
        options={status}
        value={formData.status}
        handleChange={handleChange}
        defaultValue={"Wybierz status"}
        className={"w-full p-2 border rounded"}
        error={errors.status}
      />
      <FormSelect
        htmlFor={"jobTitle"}
        text={"Stanowisko"}
        options={jobTitles}
        value={formData.jobTitle}
        handleChange={handleChange}
        defaultValue={"Wybierz stanowisko"}
        className={"w-full p-2 border rounded"}
        error={errors.jobTitle}
      />
      <FormSelect
        htmlFor={"department"}
        text={"Dział"}
        options={departments}
        value={formData.department}
        handleChange={handleChange}
        defaultValue={"Wybierz dział"}
        className={"w-full p-2 border rounded"}
        error={errors.department}
      />
      <FormInput
        type={"date"}
        name={"startDate"}
        value={formData.startDate}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Data rozpoczęcia pracy"}
        error={errors.startDate}
        min={"2000-01-01"}
      />
      <FormSelect
        htmlFor={"contractType"}
        text={"Rodzaj umowy"}
        options={contractTypes}
        value={formData.contractType}
        handleChange={handleChange}
        defaultValue={"Wybierz rodzaj umowy"}
        className={"w-full p-2 border rounded"}
        error={errors.contractType}
      />
      <FormSelect
        htmlFor={"workSchedule"}
        text={"Rodzaj wymiaru pracy"}
        options={workSchedules}
        value={formData.workSchedule}
        handleChange={handleChange}
        defaultValue={"Wybierz rodzaj wymiaru pracy"}
        className={"w-full p-2 border rounded"}
        error={errors.workSchedule}
      />
      <FormSelect
        htmlFor={"insuranceType"}
        text={"Rodzaj ubezpieczenia"}
        options={insuranceTypes}
        value={formData.insuranceType}
        handleChange={handleChange}
        defaultValue={"Wybierz rodzaj ubezpieczenia"}
        className={"w-full p-2 border rounded"}
        error={errors.insuranceType}
      />
      <FormInput
        type={"number"}
        name={"annualLeaveDays"}
        value={formData.annualLeaveDays}
        handleChange={handleChange}
        className={"w-full p-2 border rounded"}
        label={"Dni urlopu"}
        error={errors.annualLeaveDays}
      />
    </div>
  );
}