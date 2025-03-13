import { h } from "preact";

type ErrorMessageProps = {
  children: h.JSX.Element|string;
};

export default function ErrorMessage(
  { children }: ErrorMessageProps,
) {
  return (
    <p
      class='text-red-500 font-bold text-center mt-4 transition-opacity duration-1000'
    >
      {children}
    </p>
  );
}
