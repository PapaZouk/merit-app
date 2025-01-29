import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import FormLabel from "./FormLabel.tsx";

export type Option = {
  value: string | undefined;
  label: string;
};

type UpdateSelectProps = {
  htmlFor: string;
  text: string;
  options: Option[];
  value: { value: string; label: string } | string | undefined;
  handleChange: (
    e: createElement.JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => void;
  defaultValue?: string | undefined;
  extraValues?: string[] | undefined;
  className?: string;
  extraClass?: string;
  error?: string;
  hasLabel?: boolean;
  selectedOption?: string;
};

export default function FormSelect(
  {
    htmlFor,
    text,
    options,
    value,
    handleChange,
    defaultValue,
    extraValues,
    className,
    extraClass,
    error,
    hasLabel = true,
    selectedOption,
  }: UpdateSelectProps,
) {
  if (typeof value === "object") {
    value = value.value;
  }

  const style =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2";
  return (
    <div>
      {hasLabel && <FormLabel htmlFor={htmlFor} text={text} />}
      <select
        id={htmlFor}
        name={htmlFor}
        value={value}
        onChange={handleChange}
        class={className
          ? className
          : extraClass
          ? `${style} ${extraClass}`
          : style}
      >
        {defaultValue && (
          <option value="" disabled selected>
            {defaultValue}
          </option>
        )}
        {options.map((option: Option) => (
          <option key={option.value} value={option.value} selected={selectedOption === option.label}>
            {option.label}
          </option>
        ))}
        {extraValues &&
          extraValues.map((extraOption) => (
            <option key={extraOption} value={extraOption}>
              {extraOption}
            </option>
          ))}
      </select>
      {error && <p class="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
