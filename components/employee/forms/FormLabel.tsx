type UpdateLabelProps = {
    htmlFor: string;
    text: string;
}

export default function FormLabel({ htmlFor, text }: UpdateLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            class="block text-sm font-medium text-gray-700 mb-2"
        >
            {text}
        </label>
    )
}