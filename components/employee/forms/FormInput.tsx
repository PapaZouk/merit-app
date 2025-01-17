import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormLabel from "./FormLabel.tsx";

type UpdateInputProps = {
  type: string;
  name: string;
  value: string | number | undefined;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  label?: string | undefined;
  pattern?: string;
  placeholder?: string;
  className?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  error?: string;
  autoComplete?: string;
};

export default function FormInput(
  {
    type,
    name,
    value,
    handleChange,
    label,
    pattern,
    placeholder,
    className,
    min,
    max,
    required,
    error,
    autoComplete,
  }: UpdateInputProps,
) {
  return (
    <div>
      {(label && name) && <FormLabel htmlFor={name} text={label} />}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        class={className
          ? className
          : "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"}
        pattern={pattern}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required ?? false}
        autoComplete={autoComplete}
      />
      {error && (
        <p class="text-red-500 text-sm">
          <strong>{error}</strong>
        </p>
      )}
    </div>
  );
}
