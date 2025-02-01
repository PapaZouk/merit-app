import { ArrowDownUp } from "https://esm.sh/lucide-preact@latest";
import { Employee } from "../utils/api-client/types/Employee.ts";
import SortButton from "../buttons/SortButton.tsx";

type OverviewTableNavProps = {
  handleSort: (
    key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  ) => void;
};

export default function EmployeesOverviewTableNav(
  { handleSort }: OverviewTableNavProps,
) {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 mb-2">
      <p class="flex items-center text-gray-800 mb-2 sm:mb-0 sm:mr-2">
        <ArrowDownUp class="mr-1 w-4 h-4 sm:w-6 sm:h-6" />
        <span class="inline">Sortuj według:</span>
      </p>
      <div class="flex flex-wrap">
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
  );
}
