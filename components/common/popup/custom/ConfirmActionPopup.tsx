import { h } from "preact";

type ConfirmActionProps = {
  handleConfirm:
    | (() => void | Promise<void>)
    | ((value: any) => void | Promise<void>);
  handleDecline: () => void;
  message: string;
};

export default function ConfirmActionPopup(
  { handleConfirm, handleDecline, message }: ConfirmActionProps,
): h.JSX.Element {
  return (
    <div class="p-4 space-y-4">
      <p class="mb-4 text-black">
        {message}
      </p>
      <div class="flex space-x-4 justify-center">
        <button
          onClick={handleConfirm}
          class="px-4 py-2 bg-green-500 text-black rounded text-center"
        >
          Tak
        </button>
        <button
          onClick={handleDecline}
          class="px-4 py-2 bg-red-500 text-black rounded text-center"
        >
          Nie
        </button>
      </div>
    </div>
  );
}
