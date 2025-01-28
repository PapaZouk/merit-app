import {h} from "preact";
import {CalendarClock, CalendarX, Scale, TreePalm, User,} from "https://esm.sh/lucide-preact@latest";

export default function TimesheetOverviewTableHead(): h.JSX.Element {
    return (
        <thead>
        <tr class="bg-gray-300 text-gray-800">
            <th class="py-2 px-4 text-left">
                <User class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Pracownik</span>
            </th>
            <th class="py-2 px-4 text-left">
                <CalendarX class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">
                Dni zarejestrowane
              </span>
            </th>
            <th class="py-2 px-4 text-left">
                <TreePalm class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Dni wolne</span>
            </th>
            <th class="py-2 px-4 text-left">
                <CalendarClock class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Łącznie godzin</span>
            </th>
            <th class="py-2 px-4 text-left">
                <Scale class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Bilans</span>
            </th>
            <th class="py-2 px-4 text-left"></th>
        </tr>
        </thead>
    )
}