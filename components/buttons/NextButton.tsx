import { h } from "preact";
import { ArrowRight } from "https://esm.sh/lucide-preact@latest";

type NextButtonProps = {
  disabled?: boolean;
  handleNext: () => void;
  isTextVisible?: boolean;
};

export default function NextButton(
  { disabled = false, handleNext, isTextVisible = false }: NextButtonProps,
): h.JSX.Element {
  return (
    <button
      onClick={handleNext}
      disabled={disabled}
      class="flex items-center px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ml-4"
    >
      {isTextVisible && "Następne "}
      <ArrowRight size={14} class={isTextVisible && "ml-2"} />
    </button>
  );
}
