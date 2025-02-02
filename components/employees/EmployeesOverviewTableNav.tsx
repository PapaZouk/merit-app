import { ArrowDownUp } from "https://esm.sh/lucide-preact@latest";
import { Employee } from "../utils/api-client/types/Employee.ts";
import SortButton from "../buttons/SortButton.tsx";
import FormInput from "../employee/forms/FormInput.tsx";
import FormLabel from "../employee/forms/FormLabel.tsx";

type OverviewTableNavProps = {
  handleSort: (
    key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  ) => void;
  handleShowArchived: () => void;
};

export default function EmployeesOverviewTableNav(
  { handleSort, handleShowArchived }: OverviewTableNavProps,
) {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 mb-2">
      <div class="flex items-center mb-2 sm:mb-0 sm:mr-4">
        <FormLabel
          htmlFor={"archivedEmployees"}
          text={"Pokaż archiwalnych"}
          className="mr-2"
        />
        <FormInput
          type={"checkbox"}
          name={"archivedEmployees"}
          handleChange={handleShowArchived}
        />
      </div>
      <div class="flex flex-col items-center sm:flex-row sm:items-center sm:mb-0 sm:mr-2">
        <p class="flex items-center text-gray-800 mb-2 sm:mb-0">
          <ArrowDownUp class="mr-1 w-4 h-4 sm:w-6 sm:h-6" />
          <p class="inline mr-4">Sortuj według:</p>
        </p>
        <div class="flex flex-wrap justify-center items-center sm:items-start lg:items-center">
          <SortButton
            handleSort={() => handleSort("lastName")}
            type={"Nazwisko"}
          />
          <SortButton
            handleSort={() => handleSort("department")}
            type={"Dział"}
            classes={"hidden lg:block"}
          />
          <SortButton
            handleSort={() => handleSort("jobTitle")}
            type={"Stanowisko"}
            classes={"hidden lg:block"}
          />
        </div>
      </div>
    </div>
  );
}
