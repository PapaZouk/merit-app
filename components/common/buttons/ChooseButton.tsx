import { h } from 'preact';

type ChooseButtonProps = {
    onClick: () => void;
};

export default function ChooseButton(
    { onClick }: ChooseButtonProps,
): h.JSX.Element {
    return (
        <button
            type="button"
            onClick={onClick}
            class="flex items-center bg-gradient-to-r from-green-500 to-green-600
            text-white px-3 py-2 rounded hover:from-green-600 hover:to-green-700
            transition-colors duration-300"
        >
            Wybierz
        </button>
    );
}