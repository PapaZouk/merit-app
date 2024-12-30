import { Employee } from "../../utils/api-client/types/Employee.ts";

export function getJobTitle(employeeData: Employee) {
  switch (employeeData.jobDetails.jobTitle.toLowerCase()) {
    case "ceo":
      return "Prezes Zarządu";
    case "cto":
      return "Dyrektor Techniczny";
    case "coo":
      return "Dyrektor Operacyjny";
    case "cfo":
      return "Dyrektor Finansowy";
    case "hr-manager":
      return "Kierownik HR";
    case "sales-manager":
      return "Kierownik Sprzedaży";
    case "marketing-specialist":
      return "Specjalista Marketingu";
    case "accountant":
      return "Księgowy";
    case "assistant":
      return "Asystent";
    case "manager":
      return "Manager";
    case "coordinator":
      return "Koordynator";
    case "tinsmith":
      return "Blacharz";
    case "fitter":
      return "Monter";
    default:
      return "Inne";
  }
}
