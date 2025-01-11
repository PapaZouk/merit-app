import { h } from 'preact';

type CloseButtonProps = {
    onClose: () => void;
}

export default function CloseButton({onClose}: CloseButtonProps): h.JSX.Element {
    return (
        <button
            onClick={onClose}
            class="mb-4 p-2 bg-red-500 text-white rounded"
        >
            Zamknij
        </button>
    )
}