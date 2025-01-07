import { Trash2 } from "https://esm.sh/lucide-preact@latest";

type DeleteButtonProps = {
    handleDelete: () => void;
}

export default function DeleteButton({ handleDelete }: DeleteButtonProps) {
    return (
        <button
            onClick={handleDelete}
            class="flex items-center bg-gradient-to-r from-red-400 to-red-500
            text-white px-3 py-2 rounded hover:from-red-400 hover:to-red-600
            transition-colors duration-300 text-sm"
        >
            <Trash2 size={16} class="pt-1 mr-2"/> Usuń
        </button>
    );
}