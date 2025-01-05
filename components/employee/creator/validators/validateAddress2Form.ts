import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { zipPattern } from "../../forms/utils/patterns.ts";

export function validateAddress2Form(data: EmployeeFormData) {
  const errors: { [key: string]: string } = {};

  if (data.street2 && data.street2.length < 3) {
      errors.street2 = "Ulica musi mieć co najmniej 3 znaki";
  }

  if (data.city2 && data.city2.length < 3) {
    errors.city2 = "Miasto musi mieć co najmniej 3 znaki";
  }

  if (data.zip2 && !zipPattern.test(data.zip2)) {
    errors.zip2 = "Niepoprawny kod pocztowy. Wzór: 00-000";
  }

  return errors;
}