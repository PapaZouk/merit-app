import BackButton from "../../common/buttons/BackButton.tsx";
import FormUpdateHeader from "../formUpdateHeader.tsx";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import { h } from "preact";
import SaveButton from "../../common/buttons/SaveButton.tsx";

type UpdateFormProps = {
  children: h.JSX.Element;
  employeeData: Employee;
  subTitle?: string | null;
  handleSubmit: (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => void;
};

export default function EmployeeUpdateForm(
  { children, employeeData, subTitle, handleSubmit }: UpdateFormProps,
) {
  return (
    <div class="bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <div class="col-span-4 flex items-end justify-start mb-6">
        <BackButton href={`/hr/employee/${employeeData._id}`} />
      </div>
      <FormUpdateHeader employeeData={employeeData} subTitle={subTitle} />
      <form class="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {children}
        <div class="flex items-center">
          <SaveButton />
        </div>
      </form>
    </div>
  );
}
