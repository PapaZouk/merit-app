import { h } from "preact";

type SuccessMessageProps = {
  children: h.JSX.Element;
};

export default function SuccessMessage({ children }: SuccessMessageProps) {
  return (
    <div
      class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-2"
      role="alert"
    >
      {children}
    </div>
  );
}
