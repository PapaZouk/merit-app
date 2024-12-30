import { Pencil } from "https://esm.sh/lucide-preact@latest";

type EditButtonProps = {
    href: string;
}

export default function EditButton({ href }: EditButtonProps) {
    return (
        <a
            href={href}
            class="flex items-center bg-gradient-to-r from-blue-400 to-blue-500
            text-white px-3 py-2 rounded hover:from-blue-400 hover:to-blue-600
            transition-colors duration-300 text-sm"
        >
            <Pencil size={16} class="pt-1 mr-2"/> Edytuj
        </a>
    );
}