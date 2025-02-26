import { useEffect, useState } from "preact/hooks";
import { AnnualLeave } from "../../../components/utils/api-client/types/AnnualLeave.ts";
import { mapTimesheetMonth } from "../../../components/timesheet/mappers/mapTimesheetMonth.ts";

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
    .from({ length: 12 }, (_, i) => i + 1)
    .map((month: number) => month.toString());
  const overviewYearMonths = yearMonths.map((month: string) => {
    return new Date(Number.parseInt(year), Number.parseInt(month), 0)
      .getDate();
  });
  const monthsDays = overviewYearMonths.map((days: number) => {
    return Array.from({ length: days }, (_, i) => i + 1);
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
      <div class="flex justify-between items-center mb-6">
        <button
          class="bg-green-500 text-white rounded px-4 py-2"
          onClick={handlePreviousYear}
        >
          Poprzedni rok
        </button>
        <h1 class="text-3xl font-bold mb-6 text-center">{year}</h1>
        <button
          class="bg-green-500 text-white rounded px-4 py-2"
          onClick={handleNextYear}
        >
          Następny rok
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {annualLeavesByMonth.map(
          (annualLeaves: AnnualLeave[], index: number) => {
            const month = index + 1;
            const daysInMonth = monthsDays[index];
            return (
              <div key={month} class="bg-white p-4 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4 text-center">
                  {mapTimesheetMonth(month)}
                </h2>
                <div class="grid grid-cols-7 gap-2">
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
                            ? "bg-green-500 text-white"
                            : "bg-white text-black"
                        } hover:shadow-lg transition-shadow duration-300`}
                        title={isDayOff
                          ? dayOffs.map((d) => d.employeeId).join(", ")
                          : ""}
                      >
                        {day}
                        {isDayOff && (
                          <div class="w-6 h-6 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mt-1">
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
