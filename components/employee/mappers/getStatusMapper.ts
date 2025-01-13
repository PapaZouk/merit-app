export function getStatusMapper(status: string): string {
  switch (status.toLowerCase()) {
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
