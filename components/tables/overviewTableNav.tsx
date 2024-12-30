import {ArrowDownUp} from "https://esm.sh/lucide-preact@latest";
import {Employee} from "../utils/api-client/types/Employee.ts";
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
    <div class="flex items-center">
      <p class="flex items-center text-gray-300 mr-2">
        <ArrowDownUp class="mr-1" /> Sortuj według:
      </p>
      <SortButton handleSort={() => handleSort("firstName")} type={"Imię"} />
      <SortButton handleSort={() => handleSort("department")} type={"Dział"} />
      <SortButton
        handleSort={() => handleSort("jobTitle")}
        type={"Stanowisko"}
      />
    </div>
  );
}
