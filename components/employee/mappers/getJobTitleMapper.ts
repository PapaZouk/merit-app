import {EmployeeJobTitle} from "../types/EmployeeJobTitle.ts";

export function getJobTitle(title: string) {
  switch (title.toLowerCase()) {
    case EmployeeJobTitle.CEO:
      return "Prezes Zarządu";
    case EmployeeJobTitle.CTO:
      return "Dyrektor Techniczny";
    case EmployeeJobTitle.COO:
      return "Dyrektor Operacyjny";
    case EmployeeJobTitle.CFO:
      return "Dyrektor Finansowy";
    case EmployeeJobTitle.HR_MANAGER:
      return "Kierownik HR";
    case EmployeeJobTitle.SALES_MANAGER:
      return "Kierownik Sprzedaży";
    case EmployeeJobTitle.MARKETING_SPECIALIST:
      return "Specjalista Marketingu";
    case EmployeeJobTitle.ACCOUNTANT:
      return "Księgowy";
    case EmployeeJobTitle.ASSISTANT:
      return "Asystent";
    case EmployeeJobTitle.MANAGER:
      return "Manager";
    case EmployeeJobTitle.COORDINATOR:
      return "Koordynator";
    case EmployeeJobTitle.TINSMITH:
      return "Blacharz";
    case EmployeeJobTitle.FITTER:
      return "Monter";
    default:
      return "Inne";
  }
}
