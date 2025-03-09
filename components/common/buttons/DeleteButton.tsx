import { Trash2 as DefaultDeleteButtonIcon } from "https://esm.sh/lucide-preact@latest";

type DeleteButtonProps = {
  handleDelete: () => void;
  DeleteButtonIcon?: typeof DefaultDeleteButtonIcon;
};

export default function DeleteButton(
  { handleDelete, DeleteButtonIcon = DefaultDeleteButtonIcon }:
    DeleteButtonProps,
) {
  return (
    <button
      type="button"
      onClick={handleDelete}
      class="flex items-center bg-gradient-to-r from-red-400 to-red-500
            text-white px-3 py-2 rounded hover:from-red-400 hover:to-red-600
            transition-colors duration-300 text-sm"
    >
      <DeleteButtonIcon size={16} class="pt-1 mr-2" /> Usuń
    </button>
  );
}
