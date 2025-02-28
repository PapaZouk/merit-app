import {useEffect, useState} from "preact/hooks";
import {AnnualLeave} from "../../../components/utils/api-client/types/AnnualLeave.ts";
import {mapTimesheetMonth} from "../../../components/timesheet/mappers/mapTimesheetMonth.ts";
import NextButton from "../../../components/buttons/NextButton.tsx";
import PreviousButton from "../../../components/buttons/PreviousButton.tsx";
import {getDayOffBackgroundColor} from "../../../components/timesheet/annual-leaves/getDayOffBackgroundColor.ts";
import {isHolidayInPoland} from "../../../components/timesheet/calendar/utils/isHolidayInPoland.ts";
import {isWeekend} from "../../../components/timesheet/utils/isWeekend.ts";
import {getFirstDayOfMonth} from "../../../components/timesheet/utils/getFirstDayOfTheMonth.ts";

export default function AnnualLeavesOverview() {
    const [annualLeaves, setAnnualLeaves] = useState<AnnualLeave[]>([]);
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());

    useEffect(() => {
        async function fetchHolidays() {
            const response = await fetch(`/api/timesheet/annual-leaves/${year}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 404) {
                console.error("No timesheet founds for holidays");
                return;
            }

            if (response.status === 500) {
                throw new Error("Internal server error");
            }

            const responseBody = await response.json();
            const annualLeaves: AnnualLeave[] = responseBody.result;

            if (!annualLeaves || annualLeaves.length === 0) {
                setAnnualLeaves([]);
                return;
            }

            setAnnualLeaves(annualLeaves);
        }

        fetchHolidays();
    }, [year]);

    const yearMonths = Array
        .from({length: 12}, (_, i) => i + 1)
        .map((month: number) => month.toString());
    const overviewYearMonths = yearMonths.map((month: string) => {
        return new Date(Number.parseInt(year), Number.parseInt(month), 0)
            .getDate();
    });
    const monthsDays = overviewYearMonths.map((days: number) => {
        return Array.from({length: days}, (_, i) => i + 1);
    });

    const annualLeavesByMonth = monthsDays.map(
        (days: number[], index: number) => {
            const month = index + 1;
            return annualLeaves.filter((annualLeave: AnnualLeave) => {
                return annualLeave.month === month;
            });
        },
    );

    const handlePreviousYear = () => {
        const previousYear = Number.parseInt(year) - 1;
        setYear(previousYear.toString());
    };

    const handleNextYear = () => {
        const nextYear = Number.parseInt(year) + 1;
        setYear(nextYear.toString());
    };

    return (
        <div class="p-4 bg-white min-h-screen">
            <div class="flex justify-center items-center mb-4 mt-4">
                <PreviousButton handlePrevious={handlePreviousYear}/>
                <h1 class="text-3xl font-bold mt-6 mb-6 text-center">{year}</h1>
                <NextButton handleNext={handleNextYear}/>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {annualLeavesByMonth.map(
                    (annualLeaves: AnnualLeave[], index: number) => {
                        const month = index + 1;
                        const daysInMonth = monthsDays[index];

                        const firstDayOfTheMonth = getFirstDayOfMonth(Number.parseInt(year), month);
                        const emptyDays = Array.from({length: firstDayOfTheMonth === 0 ? 6 : firstDayOfTheMonth - 1 });

                        return (
                            <div key={month} class="bg-white p-4 rounded-lg shadow-md">
                                <h2 class="text-2xl font-semibold mb-4 text-center">
                                    {mapTimesheetMonth(month)}
                                </h2>
                                <div class="grid grid-cols-7 gap-2">
                                    {emptyDays.map((_, i) => (
                                        <div key={`empty-${month}-${i}`} class="p-2"></div>
                                    ))}
                                    {daysInMonth.map((day: number) => {
                                        const dayOffs = annualLeaves.flatMap(
                                            (annualLeave: AnnualLeave) =>
                                                annualLeave.days.flat().filter(
                                                    (d) => d.day === day && d.dayOff.isDayOff,
                                                ).map((d) => ({
                                                    ...d,
                                                    employeeId: annualLeave.employeeId,
                                                })),
                                        );
                                        const isDayOff = dayOffs.length > 0;
                                        return (
                                            <div
                                                key={day}
                                                class={`p-2 text-center rounded border ${
                                                    isDayOff
                                                        ? `${(getDayOffBackgroundColor(dayOffs.length))} text-black`
                                                        : `${isHolidayInPoland(Number.parseInt(year), month, day)
                                                            ? "bg-red-200"
                                                            : isWeekend(Number.parseInt(year), month, day)
                                                                ? "bg-gray-100"
                                                                : "bg-white"
                                                        } text-black`
                                                } hover:shadow-lg transition-shadow duration-300`}
                                                title={isDayOff
                                                    ? dayOffs.map((d) => d.employeeId).join(", ")
                                                    : ""}
                                            >
                                                {day}
                                                {isDayOff && (
                                                    <div
                                                        class="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center mx-auto mt-1">
                                                        {dayOffs.length}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
}
