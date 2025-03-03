import { h } from "preact";

type CloseButtonProps = {
  onClose: () => void;
};

export default function CloseButton(
  { onClose }: CloseButtonProps,
): h.JSX.Element {
  return (
    <button
      onClick={onClose}
      class="flex items-center bg-gradient-to-r from-red-500 to-red-600
      text-white mr-2 px-3 py-2 rounded hover:from-red-600 hover:to-red-700
      transition-colors duration-300"
    >
      Zamknij
    </button>
  );
}
