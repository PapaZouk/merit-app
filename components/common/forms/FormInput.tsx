import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormLabel from "./FormLabel.tsx";

type UpdateInputProps = {
  type: string;
  id: string;
  name: string;
  value?: string | number | undefined;
  handleChange?: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  handleKeyDown?: (e: KeyboardEvent) => void;
  label?: string | undefined;
  pattern?: string;
  placeholder?: string;
  className?: string;
  extraClass?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  checked?: boolean;
  disabled?: boolean;
};

export default function FormInput(
  {
    type,
    id,
    name,
    value,
    handleChange,
    handleKeyDown,
    label,
    pattern,
    placeholder,
    className,
    extraClass,
    min,
    max,
    required,
    error,
    autoComplete,
    checked,
    disabled,
  }: UpdateInputProps,
) {
  let labelStyle;
  if (type === "checkbox") {
    labelStyle =
      "form-checkbox h-5 w-5 mt-2 text-indigo-600 transition duration-150 ease-in-out";
  } else {
    labelStyle = "mt-1 block w-full rounded-md border-gray-300 shadow-sm " +
      "focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2";
  }

  let maxLength = undefined;
  let minLength = undefined;
  if (max) {
    maxLength = typeof max === "number" ? max : Number.parseInt(max);
  }
  if (min) {
    minLength = typeof min === "number" ? min : Number.parseInt(min);
  }

  return (
    <div>
      {(label && name) && <FormLabel htmlFor={name} text={label} />}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        class={className
          ? className
          : extraClass
          ? `${labelStyle} ${extraClass}`
          : labelStyle}
        pattern={pattern}
        placeholder={placeholder}
        min={minLength}
        maxLength={maxLength}
        required={required ?? false}
        autoComplete={autoComplete}
        checked={checked}
        disabled={disabled}
      />
      {error && (
        <p class="text-red-500 text-sm">
          <strong>{error}</strong>
        </p>
      )}
    </div>
  );
}
