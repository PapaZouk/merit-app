import { EmployeeFormData } from "../../types/EmployeeFormData.ts";

export function validateSalaryForm(data: EmployeeFormData) {
  const errors: { [key: string]: string } = {};

  if (!data.baseSalary) {
    errors.baseSalary = "Podstawowe wynagrodzenie jest wymagane";
  } else {
    if (data.baseSalary < 0) {
      errors.baseSalary = "Podstawowe wynagrodzenie nie może być ujemne";
    }
  }

  if (!data.hourlyRate) {
    errors.hourlyRate = "Stawka godzinowa jest wymagana";
  } else {
    if (data.hourlyRate < 0) {
      errors.hourlyRate = "Stawka godzinowa nie może być mniejsza niż 0";
    }
  }

  if (!data.currency) {
    errors.currency = "Waluta jest wymagana";
  }

  if (!data.bankAccount) {
    errors.bankAccount = "Numer konta bankowego jest wymagany";
  } else {
    if (data.bankAccount.length < 26) {
      errors.bankAccount =
        "Numer konta bankowego musi mieć co najmniej 26 znaków";
    }
    if (data.bankAccount.length > 26) {
      errors.bankAccount =
        "Numer konta bankowego nie może mieć więcej niż 26 znaków";
    }
  }

  if (!data.bankName) {
    errors.bankName = "Nazwa banku jest wymagana";
  } else {
    if (data.bankName.length < 3) {
      errors.bankName = "Nazwa banku musi mieć co najmniej 3 znaki";
    }
  }

  if (!data.currency) {
    errors.currency = "Waluta jest wymagana";
  }

  return errors;
}
