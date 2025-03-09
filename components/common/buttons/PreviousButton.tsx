import { h } from "preact";
import { ArrowLeft as DefaultPreviousButtonIcon } from "https://esm.sh/lucide-preact@latest";

type PreviousButtonProps = {
  disabled?: boolean;
  handlePrevious: () => void;
  isTextVisible?: boolean;
  PreviousButtonIcon?: typeof DefaultPreviousButtonIcon;
};

export default function PreviousButton(
  {
    disabled,
    handlePrevious,
    isTextVisible = false,
    PreviousButtonIcon = DefaultPreviousButtonIcon,
  }: PreviousButtonProps,
): h.JSX.Element {
  return (
    <button
      onClick={handlePrevious}
      disabled={disabled}
      class="flex items-center px-4 py-2 bg-gray-300 rounded disabled:opacity-50 mr-4"
    >
      <PreviousButtonIcon size={14} class={isTextVisible && "mr-2"} />
      {isTextVisible && " Poprzednie"}
    </button>
  );
}
