import { LuSquareUserRound } from "@preact-icons/lu";
import { Employee } from "../utils/api-client/types/Employee.ts";

type EmployeeHeaderProps = {
  employeeData: Employee;
  subTitle?: string | null;
};

export default function FormUpdateHeader(
  { employeeData, subTitle }: EmployeeHeaderProps,
) {
  return (
    <div class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-start space-y-2 sm:space-y-0 sm:space-x-4">
      <h1 class="text-2xl sm:text-3xl font-bold p-2 flex items-center">
        <LuSquareUserRound size={32} class="mr-4" />
        {employeeData.personalData.firstName}{" "}
        {employeeData.personalData.lastName}
      </h1>
      {subTitle && (
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm inline-block align-middle">
          {subTitle}
        </h2>
      )}
    </div>
  );
}