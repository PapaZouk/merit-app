import { SquareUserRound } from "https://esm.sh/lucide-preact@latest";
import { Employee } from "../utils/api-client/types/Employee.ts";

type EmployeeHeaderProps = {
  employeeData: Employee;
  subTitle?: string | null;
};

export default function FormUpdateHeader(
  { employeeData, subTitle }: EmployeeHeaderProps,
) {
  return (
    <div class="mb-6 flex items-center justify-start space-x-4">
      <h1 class="text-3xl font-bold p-2 flex items-center">
        <SquareUserRound size={32} class="mr-4" />
        {employeeData.personalData.firstName}{" "}
        {employeeData.personalData.lastName}
      </h1>
      {subTitle && (
        <h2 class="text-2xl font-semibold text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm inline-block align-middle">
          {subTitle}
        </h2>
      )}
    </div>
  );
}