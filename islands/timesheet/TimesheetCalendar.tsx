import { h } from "preact";
import { useState } from "preact/hooks";
import { Timesheet } from "../../components/utils/api-client/types/Timesheet.ts";
import GridWeekDayNames from "../../components/timesheet/calendar/GridWeekDayNames.tsx";
import GridWorkDays from "../../components/timesheet/calendar/GridWorkDays.tsx";
import BackButton from "../../components/buttons/BackButton.tsx";
import { mapTimesheetMonth } from "../../components/timesheet/mappers/mapTimesheetMonth.ts";
import Popup from "../../components/popup/popup.tsx";
import { updateTimesheetByEmployeeId } from "../../components/utils/api-client/clients/timesheetClient.ts";
import CloseButton from "../../components/buttons/CloseButton.tsx";
import createTimesheetDayUpdateRequest from "../../components/utils/api-client/timesheet/createTimesheetDayUpdateRequest.ts";
import FormInput from "../../components/employee/forms/FormInput.tsx";
import FormSelect from "../../components/employee/forms/FormSelect.tsx";
import AddTimesheetDay from "../../components/popup/AddTimesheetDay.tsx";

type TimesheetCalendarProps = {
  employeeId: string;
  timesheet: Timesheet[];
  year: number;
  month: number;
  apiConfig: {
    url: string;
    token: string;
  };
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
  { employeeId, timesheet, year, month, apiConfig }: TimesheetCalendarProps,
): h.JSX.Element {
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null,
  );
  const [selectedDayOffType, setSelectedDayOffType] = useState<string | null>(
    null,
  );
  const [formType, setFormType] = useState<string>("");

  const daysInMonth: number = new Date(year, month, 0).getDate();
  const daysArray: number[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1,
  );
  const firstDayOfMonth: number = (new Date(year, month - 1, 1).getDay() + 6) %
    7; // Adjust to start from Monday
  const currentDate: Date = new Date();

  const getDayData = (day: number): DayData => {
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

    if (formData.dayOffType) {
      const dayUpdateRequest = createTimesheetDayUpdateRequest(
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
            selectedDayOffType === "unpaid",
          isHoliday: selectedDayOffType === "bankHoliday",
          isPaid: selectedDayOffType === "paid",
          type: selectedDayOffType || "",
        },
      );

      try {
        await updateTimesheetByEmployeeId(
          employeeId,
          dayUpdateRequest,
          apiConfig,
        );
        globalThis.location.reload();
      } catch (error) {
        console.error("Error while updating timesheet:", error);
      } finally {
        handlePopup();
      }
      return;
    }

    const dayUpdateRequest = createTimesheetDayUpdateRequest(
      selectedTimesheet?._id || "",
      employeeId,
      year,
      month,
      selectedDay,
      formData.checkin?.value,
      formData.checkout?.value,
      selectedTimesheet,
      false,
    );

    try {
      await updateTimesheetByEmployeeId(
        employeeId,
        dayUpdateRequest,
        apiConfig,
      );
      globalThis.location.reload();
    } catch (error) {
      console.error("Error while updating timesheet:", error);
    } finally {
      handlePopup();
    }
  };

  return (
    <div class="w-full bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <div class="w-full">
        <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6">
          <BackButton href={"/hr/timesheet/overview"} />
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
