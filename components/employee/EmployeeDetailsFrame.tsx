import { h } from 'preact';
import EditButton from "../buttons/EditButton.tsx";

type EmployeeDetailsFrameProps = {
    children: h.JSX.Element|string;
    title: string;
    size?: string;
    editLink: string;
}

export default function EmployeeDetailsFrame({ children, title, size = "2", editLink }: EmployeeDetailsFrameProps): h.JSX.Element {
    return (
        <div class={`col-span-${size} bg-white p-6 rounded-lg shadow-md`}>
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 class="text-2xl font-semibold text-gray-700 mb-2 md:mb-0">
                    {title}
                </h2>
                <EditButton href={editLink} />
            </div>
            <div class="space-y-2">
                {children}
            </div>
        </div>
    )
}