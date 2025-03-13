import {h} from "preact";
import {LuArrowRight as DefaultNextButtonIcon} from "@preact-icons/lu";

type NextButtonProps = {
  disabled?: boolean;
  handleNext: () => void;
  isTextVisible?: boolean;
  NextButtonIcon?: typeof DefaultNextButtonIcon;
};

export default function NextButton(
  {
    disabled = false,
    handleNext,
    isTextVisible = false,
    NextButtonIcon = DefaultNextButtonIcon,
  }: NextButtonProps,
): h.JSX.Element {
    return (
    <button
      type="button"
      onClick={handleNext}
      disabled={disabled}
      class="flex items-center px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ml-4"
    >
      {isTextVisible && "Następne "}
      <NextButtonIcon size={14} class={isTextVisible ? "ml-2" : ""} />
    </button>
  );
}
