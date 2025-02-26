import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import {
  Days,
  Timesheet,
} from "../../components/utils/api-client/types/Timesheet.ts";
import GridWeekDayNames from "../../components/timesheet/calendar/GridWeekDayNames.tsx";
import GridWorkDays from "../../components/timesheet/calendar/GridWorkDays.tsx";
import BackButton from "../../components/buttons/BackButton.tsx";
import { mapTimesheetMonth } from "../../components/timesheet/mappers/mapTimesheetMonth.ts";
import Popup from "../../components/popup/popup.tsx";
import createTimesheetDayUpdateRequest from "../../components/utils/api-client/timesheet/createTimesheetDayUpdateRequest.ts";
import AddTimesheetDay from "../../components/popup/AddTimesheetDay.tsx";
import { isHolidayInPoland } from "../../components/timesheet/calendar/utils/isHolidayInPoland.ts";
import Loader from "../../components/loader/loader.tsx";
import { emptyTimesheetData } from "../../components/employee/utils/emptyTimesheetData.ts";
import { AddTimesheetRequest } from "../../components/utils/api-client/types/AddTimesheetRequest.ts";

type TimesheetCalendarProps = {
  employeeId: string;
  year: number;
  month: number;
};

type DayData = {
  hours: number;
  balance: number;
  isHoliday: boolean;
  isDayOff: boolean;
  isSickLeave: boolean;
  dayOffType: string;
};

export default function TimesheetCalendar(
  { employeeId, year, month }: TimesheetCalendarProps,
): h.JSX.Element {
  const [timesheet, setTimesheet] = useState<Timesheet[] | null>(null);
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null,
  );
  const [selectedDayOffType, setSelectedDayOffType] = useState<string | null>(
    null,
  );
  const [formType, setFormType] = useState<string>("");
  const [isNewTimesheet, setIsNewTimesheet] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTimesheet() {
      const response = await fetch(
        `/api/timesheet/${employeeId}?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response || !response.ok) {
        const emptyTimesheet: Timesheet = emptyTimesheetData(
          employeeId,
          year,
          month,
        );
        setTimesheet([emptyTimesheet]);
        setIsNewTimesheet(true);
        return;
      }

      const responseJsonBody = await response.json();

      if (!responseJsonBody.result || responseJsonBody.result.length === 0) {
        const emptyTimesheet: Timesheet = emptyTimesheetData(
          employeeId,
          year,
          month,
        );
        setTimesheet([emptyTimesheet]);
        setIsNewTimesheet(true);
        return;
      }

      const timesheet: Timesheet[] = responseJsonBody.result;
      setTimesheet(timesheet);
    }

    if (!timesheet && year && month) {
      fetchTimesheet();
    }
  }, []);

  const daysInMonth: number = new Date(year, month, 0).getDate();
  const daysArray: number[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1,
  );
  const firstDayOfMonth: number = (
    new Date(year, month - 1, 1).getDay() + 6
  ) % 7; // Adjust to start from Monday
  const currentDate: Date = new Date();

  const getDayData = (day: number): DayData => {
    if (timesheet) {
      for (const t of timesheet) {
        if (t.year === year && t.month === month) {
          setSelectedTimesheet(t);
          const dayData = t.days.find((d) => d.day === day);
          if (dayData) {
            return {
              hours: parseFloat(dayData.hours.$numberDecimal),
              balance: parseFloat(dayData.balance.$numberDecimal),
              isHoliday: dayData.dayOff.isHoliday,
              isDayOff: dayData.dayOff.isDayOff,
              isSickLeave: dayData.sickLeave.isSickLeave,
              dayOffType: dayData.dayOff.type,
            };
          }
        }
      }
    }

    return {
      hours: 0,
      balance: 0,
      isHoliday: false,
      isDayOff: false,
      isSickLeave: false,
      dayOffType: "",
    };
  };

  const handlePopup = (): void => {
    setIsPopupOpened((prev) => !prev);
    setFormType("");
  };

  const handleDaySelect = (day: number): void => {
    setSelectedDay(day);
    handlePopup();
  };

  const handleDayOffTypeSelect = (event: Event): void => {
    const formData = event.target as HTMLFormElement;
    setSelectedDayOffType(formData.value);
  };

  const handleFormTypeChange = (event: Event): void => {
    const formData = event.target as HTMLFormElement;
    setFormType(formData.value);
  };

  const handleDaySubmit = async (event: Event): Promise<void> => {
    event.preventDefault();
    const formData = event.target as HTMLFormElement;

    if (!selectedDay || !selectedTimesheet) {
      return;
    }

    let dayUpdateRequest;
    if (formData.dayOffType) {
      dayUpdateRequest = createTimesheetDayUpdateRequest(
        selectedTimesheet._id,
        employeeId,
        year,
        month,
        selectedDay,
        selectedDayOffType !== "unpaid" ? "08:00" : "16:00",
        "16:00",
        selectedTimesheet,
        selectedDayOffType === "sickLeave",
        {
          isDayOff: selectedDayOffType === "paid" ||
            selectedDayOffType === "unpaid" ||
            selectedDayOffType === "maternityLeave" ||
            selectedDayOffType === "occasionalLeave" ||
            selectedDayOffType === "parentalLeave" ||
            selectedDayOffType === "childcareLeave" ||
            selectedDayOffType === "onDemand",
          isHoliday: selectedDayOffType === "bankHoliday",
          isPaid: selectedDayOffType === "paid",
          type: selectedDayOffType || "",
        },
      );
    } else {
      const holidayInPoland = isHolidayInPoland(year, month, selectedDay);
      dayUpdateRequest = createTimesheetDayUpdateRequest(
        selectedTimesheet?._id || "",
        employeeId,
        year,
        month,
        selectedDay,
        holidayInPoland ? "08:00" : formData.checkin?.value,
        holidayInPoland ? "16:00" : formData.checkout?.value,
        selectedTimesheet,
        false,
        {
          isDayOff: false,
          isHoliday: holidayInPoland,
          isPaid: false,
          type: "",
        },
      );
    }

    if (isNewTimesheet) {
      const addTimesheetRequest: AddTimesheetRequest = {
        employeeId: employeeId,
        year: year,
        month: month,
        totalHours: dayUpdateRequest.totalHours,
        totalBalance: dayUpdateRequest.totalBalance,
        days: [...dayUpdateRequest.days.map((day: Days) => ({
          day: day.day,
          hours: day.hours.toString(),
          checkIn: day.checkIn,
          checkOut: day.checkOut,
          balance: day.balance.toString(),
          dayOff: {
            isDayOff: day.dayOff.isDayOff,
            isHoliday: day.dayOff.isHoliday,
            isPaid: day.dayOff.isPaid,
            type: day.dayOff.type,
          },
          sickLeave: {
            isSickLeave: day.sickLeave.isSickLeave,
          },
        }))],
      };

      await fetch(`/api/timesheet/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addTimesheetRequest),
      });
    } else {
      await fetch(`/api/timesheet/update/${employeeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dayUpdateRequest),
      });
    }

    globalThis.location.reload();
  };

  if (!timesheet) {
    return <Loader />;
  }

  return (
    <div class="w-full bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <div class="w-full">
        <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6">
          <BackButton href="/hr/timesheet/overview" />
        </div>
        <h1 class="text-gray-800 text-2xl font-bold mb-4">
          {mapTimesheetMonth(month)} {year}
        </h1>
        <div class="col-span-4">
          <GridWeekDayNames />
          <GridWorkDays
            firstDayOfMonth={firstDayOfMonth}
            daysArray={daysArray}
            currentDate={currentDate}
            year={year}
            month={month}
            getDayData={getDayData}
            onDaySelect={handleDaySelect}
          />
        </div>
        {isPopupOpened && selectedDay && (
          <Popup onClose={handlePopup}>
            <AddTimesheetDay
              selectedDay={selectedDay}
              month={month}
              year={year}
              handleDaySubmit={handleDaySubmit}
              handlePopup={handlePopup}
              formType={formType}
              handleFormTypeChange={handleFormTypeChange}
              selectedDayOffType={selectedDayOffType}
              handleDayOffTypeSelect={handleDayOffTypeSelect}
            />
          </Popup>
        )}
      </div>
    </div>
  );
}
