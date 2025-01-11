import { h } from 'preact'

export default function GridWeekDayNames(): h.JSX.Element {
    return (
        <div class="hidden sm:flex flex-wrap gap-2 text-center font-bold text-xs sm:text-base">
            <div class="flex-1">Pon</div>
            <div class="flex-1">Wt</div>
            <div class="flex-1">Śr</div>
            <div class="flex-1">Czw</div>
            <div class="flex-1">Pt</div>
            <div class="flex-1">Sob</div>
            <div class="flex-1">Nd</div>
        </div>
    )
}