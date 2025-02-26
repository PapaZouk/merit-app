import FormSelect from "../forms/FormSelect.tsx";
import { mapTimesheetMonth } from "../timesheet/mappers/mapTimesheetMonth.ts";
import FormInput from "../forms/FormInput.tsx";
import CloseButton from "../buttons/CloseButton.tsx";
import { dayOffTypes } from "../timesheet/types/DayOffTypes.ts";
import { formTypes } from "../timesheet/types/FormTypes.ts";
import SaveButton from "../buttons/SaveButton.tsx";

type AddTimesheetDayProps = {
  selectedDay: number;
  month: number;
  year: number;
  handleDaySubmit: (e: Event) => void;
  handlePopup: () => void;
  formType: string;
  handleFormTypeChange: (e: Event) => void;
  selectedDayOffType: string | null;
  handleDayOffTypeSelect: (e: Event) => void;
};

export default function AddTimesheetDay(
  {
    selectedDay,
    month,
    year,
    handleDaySubmit,
    handlePopup,
    formType,
    handleFormTypeChange,
    selectedDayOffType,
    handleDayOffTypeSelect,
  }: AddTimesheetDayProps,
) {
  return (
    <>
      <FormSelect
        htmlFor="formType"
        text={`${selectedDay} ${mapTimesheetMonth(month)} ${year}`}
        options={formTypes}
        extraClass="mb-4"
        defaultValue="Wybierz co chcesz dodać"
        value={formType}
        handleChange={handleFormTypeChange}
      />
      {formType === "hours" && (
        <form onSubmit={handleDaySubmit} class="space-y-4">
          <div>
            <h2 class="text-sm text-black font-bold my-4">
              Dodaj godziny
            </h2>
            <div>
              <FormInput
                type="time"
                name="checkin"
                label="Wejście"
                required
              />
            </div>
            <div>
              <FormInput
                type="time"
                name="checkout"
                label="Wyjście"
                required
              />
            </div>
          </div>
          <div class="flex items-center justify-center">
            <SaveButton />
            <CloseButton onClose={handlePopup} />
          </div>
        </form>
      )}
      {formType === "dayOff" && (
        <form onSubmit={handleDaySubmit} class="space-y-4">
          <div>
            <div>
              <FormSelect
                htmlFor="dayOffType"
                text="Rodzaj dnia wolnego"
                options={dayOffTypes}
                defaultValue="Wybierz rodzaj dnia wolnego"
                value={selectedDayOffType ?? ""}
                handleChange={handleDayOffTypeSelect}
              />
            </div>
          </div>
          <div class="flex items-center justify-center">
            <SaveButton /><CloseButton onClose={handlePopup} />
          </div>
        </form>
      )}
      {formType !== "hours" && formType !== "dayOff" && (
        <div class="flex justify-between">
          <CloseButton onClose={handlePopup} />
        </div>
      )}
    </>
  );
}
