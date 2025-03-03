import { h } from "preact";

type ErrorMessageProps = {
  showError: boolean;
  children: h.JSX.Element|string;
};

export default function ErrorMessage(
  { showError, children }: ErrorMessageProps,
) {
  return (
    <p
      class={`text-red-500 font-bold text-center mt-4 transition-opacity duration-1000 ${
        showError ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </p>
  );
}
