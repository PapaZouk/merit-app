import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import UpdateLabel from "./UpdateLabel.tsx";

type UpdateInputProps = {
  type: string;
  name: string;
  value: string | number;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  label: string;
  pattern?: string;
};

export default function UpdateInput(
  { type, name, value, handleChange, label, pattern }: UpdateInputProps,
) {
  return (
    <div>
      <UpdateLabel htmlFor={name} text={label} />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        pattern={pattern}
      />
    </div>
  );
}
