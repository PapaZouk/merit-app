export function getDepartment(department: string) {
    switch (department.toLowerCase()) {
        case "management":
            return "Zarządzanie";
        case "hr":
            return "HR";
        case "marketing":
            return "Marketing";
        case "sales":
            return "Sprzedaż";
        case "finance":
            return "Finanse i Księgowość";
        case "logistic":
            return "Logistyka";
        case "production":
            return "Produkcja i Technika";
        default:
            return "Inne";
    }
}