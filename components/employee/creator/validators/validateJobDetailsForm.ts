import { EmployeeFormData } from "../../types/EmployeeFormData.ts";

export function validateJobDetailsForm(data: EmployeeFormData) {
  const errors: { [key: string]: string } = {};

  if (!data.status) {
    errors.status = "Status jest wymagany";
  }

  if (!data.jobTitle) {
    errors.jobTitle = "Stanowisko jest wymagane";
  }
  if (!data.department) {
    errors.department = "Dział jest wymagany";
  }
  if (!data.startDate) {
    errors.startDate = "Data rozpoczęcia jest wymagana";
  }
  if (!data.contractType) {
    errors.contractType = "Typ umowy jest wymagany";
  }
  if (!data.workSchedule) {
    errors.workSchedule = "Grafik pracy jest wymagany";
  }
  if (!data.insuranceType) {
    errors.insuranceType = "Typ ubezpieczenia jest wymagany";
  }
  if (!data.annualLeaveDays) {
    errors.annualLeaveDays = "Liczba dni urlopu jest wymagana";
  } else {
    if (data.annualLeaveDays < 0) {
      errors.annualLeaveDays = "Liczba dni urlopu nie może być ujemna";
    }
    if (data.annualLeaveDays === 0) {
      errors.annualLeaveDays = "Liczba dni urlopu nie może wynosić 0";
    }
  }

  return errors;
}