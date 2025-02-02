import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { zipPattern } from "../../update/utils/patterns.ts";

export function validateAddress1Form(data: EmployeeFormData) {
  const errors: { [key: string]: string } = {};

  if (!data.street1) {
    errors.street1 = "Ulica jest wymagana";
  } else if (data.street1.length < 3) {
    errors.street1 = "Ulica musi mieć co najmniej 3 znaki";
  }

  if (!data.house1) {
    errors.house1 = "Numer domu jest wymagany";
  }

  if (!data.city1) {
    errors.city1 = "Miasto jest wymagane";
  } else if (data.city1.length < 3) {
    errors.city1 = "Miasto musi mieć co najmniej 3 znaki";
  }

  if (!data.zip1) {
    errors.zip1 = "Kod pocztowy jest wymagany";
  } else if (!zipPattern.test(data.zip1)) {
    errors.zip1 = "Niepoprawny kod pocztowy. Wzór: 00-000";
  }

  if (!data.state1) {
    errors.state1 = "Kraj jest wymagany";
  }

  if (!data.voivodeship1) {
    errors.voivodeship1 = "Województwo jest wymagane";
  }

  return errors;
}