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
      ? <span class="ml-2">Brak zmian</span>
      : (
        <span class="flex flex-col sm:flex-row items-center ml-2 space-x-1">
          <span class="truncate max-w-xs">{before === null || before === undefined || before === ""
            ? "Brak danych"
            : before}</span>
          <ArrowBigRight class="mx-1" />
          <span class="truncate max-w-xs">{after === null || after === undefined || after === ""
            ? "Brak danych"
            : after}</span>
        </span>
      )
  );
}