import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { LuUserRoundPlus } from "@preact-icons/lu";
import { EmployeeFormData } from "../types/EmployeeFormData.ts";
import PaginatedForm from "./forms/PaginatedForm.tsx";

type EmployeeCreatorProps = {
  formData: EmployeeFormData;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  handleSubmit: (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => void;
  handlePopup: () => void;
  isPopupOpened: boolean;
  errors: { [key: string]: string; };
  setErrors: (errors: { [key: string]: string; }) => void;
};

export default function EmployeeCreator({
  formData,
  handleChange,
  handleSubmit,
  handlePopup,
  errors,
  setErrors,
}: EmployeeCreatorProps) {
  return (
    <div class="p-4">
      <h1 class="flex items-center text-2xl font-bold mb-4">
        <LuUserRoundPlus class="mr-2 w-5 h-5 md:w-6 md:h-6" /> Dodaj pracownika
      </h1>
      <PaginatedForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handlePopup={handlePopup}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
}
