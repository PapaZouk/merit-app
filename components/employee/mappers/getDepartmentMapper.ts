import {Employee} from "../../utils/api-client/types/Employee.ts";

export function getDepartment(employeeData: Employee) {
    switch (employeeData.jobDetails.department.toLowerCase()) {
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