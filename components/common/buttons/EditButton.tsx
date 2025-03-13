import { LuPencil as DefaultEditButton } from "@preact-icons/lu";

type EditButtonProps = {
    href: string;
    EditButtonIcon?: typeof DefaultEditButton;
}

export default function EditButton({ href, EditButtonIcon = DefaultEditButton }: EditButtonProps) {
    return (
        <a
            href={href}
            class="flex items-center bg-gradient-to-r from-blue-400 to-blue-500
            text-white px-3 py-2 rounded hover:from-blue-400 hover:to-blue-600
            transition-colors duration-300 text-sm"
        >
            <EditButtonIcon size={16} class="pt-1 mr-2"/> Edytuj
        </a>
    );
}