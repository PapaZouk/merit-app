import { Employee } from "../../utils/api-client/types/Employee.ts";

export function getStatusMapper(employeeData: Employee): string {
  switch (employeeData.jobDetails.status.toLowerCase()) {
    case "active":
      return "Aktywny";
    case "inactive":
      return "Nieaktywny";
    case "terminated":
      return "Zwolniony";
    case "suspended":
      return "Zawieszony";
    case "on-leave":
      return "Urlop";
    case "retired":
      return "Na emeryturze"
    default:
      return "Brak";
  }
}
