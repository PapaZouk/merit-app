import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import UpdateLabel from "./UpdateLabel.tsx";

type Option = {
    value: string;
    label: string;
}

type UpdateSelectProps = {
  htmlFor: string;
  text: string;
  options: Option[];
  value: string;
  handleChange: (
    e: createElement.JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => void;
  defaultValue?: string | undefined;
  extraValues?: string[] | undefined;
};

export default function UpdateSelect(
  { htmlFor, text, options, value, handleChange, defaultValue, extraValues }:
    UpdateSelectProps,
) {
  return (
    <div>
      <UpdateLabel htmlFor={htmlFor} text={text} />
      <select
        id={htmlFor}
        name={htmlFor}
        value={value}
        onChange={handleChange}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
      >
        {defaultValue && (
          <option value={defaultValue} disabled>
            {defaultValue}
          </option>
        )}
        {extraValues &&
          extraValues.map((extraOption) => (
            <option key={extraOption} value={extraOption}>
              {extraOption}
            </option>
          ))}
        {options.map((option: Option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
