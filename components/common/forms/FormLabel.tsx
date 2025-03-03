type UpdateLabelProps = {
  htmlFor: string;
  text: string;
  className?: string;
  extraClass?: string;
};

export default function FormLabel(
  { htmlFor, text, extraClass, className }: UpdateLabelProps,
) {
  const classes = `block text-sm font-medium text-gray-700 mb-4 ${extraClass}`;
  return (
    <label
      htmlFor={htmlFor}
      class={className ? className : classes}
    >
      {text}
    </label>
  );
}
