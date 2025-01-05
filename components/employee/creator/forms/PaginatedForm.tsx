import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import PersonalDataForm from "./PersonalDataForm.tsx";
import Address1Form from "./Address1Form.tsx";
import Address2Form from "./Address2Form.tsx";
import JobDetailsForm from "./JobDetailsForm.tsx";
import SalaryForm from "./SalaryForm.tsx";
import SaveButton from "../../../buttons/SaveButton.tsx";
import { validatePersonalDataForm } from "../validators/validatePersonalDataForm.ts";
import { validateAddress1Form } from "../validators/validateAddress1Form.ts";
import { validateJobDetailsForm } from "../validators/validateJobDetailsForm.ts";
import { validateSalaryForm } from "../validators/validateSalaryForm.ts";
import { validateAddress2Form } from "../validators/validateAddress2Form.ts";

type PaginatedFormProps = {
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
  errors: { [key: string]: string };
  setErrors: (errors: { [key: string]: string }) => void;
};

const sections = [
  "personalData",
  "address1",
  "address2",
  "jobDetails",
  "salary",
];

export default function PaginatedForm({
  formData,
  handleChange,
  handleSubmit,
  handlePopup,
  errors,
  setErrors,
}: PaginatedFormProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const validatePage = () => {
    let newErrors: { [key: string]: string } = {};

    switch (currentPage) {
      case 0:
        newErrors = validatePersonalDataForm(formData);
        break;
      case 1:
        newErrors = validateAddress1Form(formData);
        break;
      case 2:
        newErrors = validateAddress2Form(formData);
        break;
      case 3:
        newErrors = validateJobDetailsForm(formData);
        break;
      case 4:
        newErrors = validateSalaryForm(formData);
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextPage = () => {
    if (validatePage()) {
      setCurrentPage((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const handleSaveButtonClick = (e: createElement.JSX.TargetedEvent<HTMLButtonElement, Event>) => {
    e.preventDefault();
    const salaryErrors = validateSalaryForm(formData);
    if (Object.keys(salaryErrors).length === 0) {
      handlePopup();
    } else {
      setErrors(salaryErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      {currentPage === 0 && (
        <PersonalDataForm
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentPage === 1 && (
        <Address1Form
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentPage === 2 && (
        <Address2Form
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentPage === 3 && (
        <JobDetailsForm
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentPage === 4 && (
        <SalaryForm
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}

      <div class="flex justify-between">
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 0}
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Wróć
        </button>
        {currentPage !== 4
          ? (
            <button
              type="button"
              onClick={nextPage}
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Dalej
            </button>
          )
          : <SaveButton onClick={handleSaveButtonClick} />}
      </div>
    </form>
  );
}