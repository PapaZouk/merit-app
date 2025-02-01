import {EmployeeStatus} from "../types/EmployeeStatus.ts";

export function getStatusMapper(status: string): string {
  switch (status.toLowerCase()) {
    case EmployeeStatus.ACTIVE:
      return "Aktywny";
    case EmployeeStatus.INACTIVE:
      return "Nieaktywny";
    case EmployeeStatus.TERMINATED:
      return "Zwolniony";
    case EmployeeStatus.SUSPENDED:
      return "Zawieszony";
    case EmployeeStatus.ON_LEAVE:
      return "Urlop";
    case EmployeeStatus.RETIRED:
      return "Na emeryturze"
    case EmployeeStatus.ARCHIVED:
        return "Zarchiwizowany";
    default:
      return "Brak danych";
  }
}
