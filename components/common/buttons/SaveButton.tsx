import { LuCheck as DefaultSaveButtonIcon } from "@preact-icons/lu";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";

type SaveButtonProps = {
  onClick?:
    | (() => void)
    | ((e: createElement.JSX.TargetedEvent<HTMLButtonElement, Event>) => void);
  SaveButtonIcon?: typeof DefaultSaveButtonIcon;
};

export default function SaveButton(
  { onClick, SaveButtonIcon = DefaultSaveButtonIcon }: SaveButtonProps,
) {
  return (
    <button
      type="submit"
      class="flex items-center bg-gradient-to-r from-green-500 to-green-600
             text-white mr-2 px-3 py-2 rounded hover:from-green-600 hover:to-green-700
             transition-colors duration-300"
      onClick={onClick}
    >
      <SaveButtonIcon size={20} class="pt-1 mr-2" /> Zapisz
    </button>
  );
}
