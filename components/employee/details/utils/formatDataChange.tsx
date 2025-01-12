import { h } from "preact";
import { ArrowBigRight } from "https://esm.sh/lucide-preact@latest";

type EmployeeUpdateSalaryProps = {
  before: string | number;
  after: string | number;
};

export default function FormatDataChange(
  { before, after }: EmployeeUpdateSalaryProps,
): h.JSX.Element {
  return (
    before === after
      ? <span class="ml-2"> Brak zmian</span>
      : (
        <span class="flex items-center ml-2">
          {" "} {before ?? "Brak danych"} <ArrowBigRight class="mx-2" />{" "}
          {after ?? "Brak danych"}
        </span>
      )
  );
}