import { h } from 'preact';

export default function NoNotificationMessage(): h.JSX.Element {
    return (
        <div class="bg-white p-4 md:p-4 rounded-lg shadow-lg text-gray-800 w-full">
            <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6 mt-2">
                <h1 class="flex items center text-xl font-bold mb-2 md:mb-0">
                    Brak powiadomień
                </h1>
            </div>
        </div>
    )
}