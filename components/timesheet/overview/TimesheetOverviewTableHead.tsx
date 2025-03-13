import {h} from "preact";
import {LuCalendarClock, LuCalendarX, LuScale, LuTreePalm, LuUser} from "@preact-icons/lu";

export default function TimesheetOverviewTableHead(): h.JSX.Element {
    return (
        <thead>
        <tr class="bg-gray-300 text-gray-800">
            <th class="py-2 px-4 text-left">
                <LuUser class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Pracownik</span>
            </th>
            <th class="py-2 px-4 text-left">
                <LuCalendarX class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">
                Dni zarejestrowane
              </span>
            </th>
            <th class="py-2 px-4 text-left">
                <LuTreePalm class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Dni wolne</span>
            </th>
            <th class="py-2 px-4 text-left">
                <LuCalendarClock class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Łącznie godzin</span>
            </th>
            <th class="py-2 px-4 text-left">
                <LuScale class="inline align-middle mr-2 w-5 h-5"/>
                <span class="hidden lg:inline align-middle">Bilans</span>
            </th>
            <th class="py-2 px-4 text-left"></th>
        </tr>
        </thead>
    )
}