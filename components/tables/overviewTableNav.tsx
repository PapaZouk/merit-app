import { ArrowDownUp } from "https://esm.sh/lucide-preact@latest";
import { Employee } from "../utils/api-client/types/Employee.ts";
import SortButton from "../buttons/SortButton.tsx";

type OverviewTableNavProps = {
  handleSort: (
    key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  ) => void;
};

export default function OverviewTableNav(
  { handleSort }: OverviewTableNavProps,
) {
  return (
    <div class="flex flex-col md:flex-row items-start md:items-center">
      <p class="flex items-center text-gray-300 mb-2 md:mb-0 md:mr-2">
        <ArrowDownUp class="mr-1 w-4 h-4 md:w-6 md:h-6" />
        <span class="inline">Sortuj według:</span>
      </p>
      <div class="flex flex-wrap">
        <SortButton handleSort={() => handleSort("firstName")} type={"Imię"} />
        <SortButton handleSort={() => handleSort("department")} type={"Dział"} />
        <SortButton handleSort={() => handleSort("jobTitle")} type={"Stanowisko"} />
      </div>
    </div>
  );
}