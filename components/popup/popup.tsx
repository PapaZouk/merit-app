import { h } from 'preact';
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";

type PopupProps = {
    children: h.JSX.Element,
    onClose: (() => void) | MouseEventHandler<HTMLButtonElement>,
}

export default function Popup({ children, onClose }: PopupProps): h.JSX.Element {
    const handlePopupClick = (event: MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 sm:mt-40 z-50" onClick={onClose}>
            <div className="bg-white p-4 rounded-lg shadow-lg" onClick={handlePopupClick}>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-900 absolute top-2 right-2">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}