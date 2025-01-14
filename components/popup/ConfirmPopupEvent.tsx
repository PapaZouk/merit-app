import { h } from "preact";
import Popup from "./popup.tsx";

type ConfirmPopupEventProps = {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmPopupEvent({
  title,
  onConfirm,
  onCancel,
}: ConfirmPopupEventProps): h.JSX.Element {
    return (
        <Popup onClose={onCancel}>
            <div class="p-4 space-y-4">
                <p class="mb-4 text-black">{title}</p>
                <div class="flex space-x-4 justify-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); onConfirm(); }}
                        class="px-4 py-2 bg-green-500 text-black rounded text-center"
                    >
                        Tak
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onCancel(); }}
                        class="px-4 py-2 bg-red-500 text-black rounded text-center"
                    >
                        Nie
                    </button>
                </div>
            </div>
        </Popup>
    );
}