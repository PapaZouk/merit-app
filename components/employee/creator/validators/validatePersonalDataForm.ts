import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { namePattern, phonePattern } from "../../forms/utils/patterns.ts";

export function validatePersonalDataForm(data: EmployeeFormData) {
  const errors: { [key: string]: string } = {};

  if (!data.firstName) {
    errors.firstName = "Imię jest wymagane";
  } else if (!namePattern.test(data.firstName)) {
    errors.firstName = "Niepoprawne imię";
  } else if (data.firstName.length < 3) {
    errors.firstName = "Imię musi mieć co najmniej 3 znaki";
  }

  if (!data.lastName) {
    errors.lastName = "Nazwisko jest wymagane";
  } else if (!namePattern.test(data.lastName)) {
    errors.lastName = "Niepoprawne nazwisko";
  } else if (data.lastName.length < 3) {
    errors.lastName = "Nazwisko musi mieć co najmniej 3 znaki";
  }

  if (!data.phone) {
    errors.phone = "Telefon jest wymagany";
  } else if (!phonePattern.test(data.phone)) {
    errors.phone = "Niepoprawny numer telefonu. Wzór: 000-000-000";
  }

  if (!data.email) {
    errors.email = "E-mail jest wymagany";
  }

  if (!data.pesel) {
    errors.pesel = "PESEL jest wymagany";
  } else if (data.pesel.length !== 11) {
    errors.pesel = "PESEL musi mieć 11 cyfr";
  }

  return errors;
}