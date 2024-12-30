import {Employee} from "../../utils/api-client/types/Employee.ts";

export function getWorkSchedule(employeeData: Employee) {
    switch (employeeData.jobDetails.workSchedule.toLowerCase()) {
        case "full-time":
            return "Pełny etat";
        case "part-time":
            return "Niepełny etat";
        case "remote":
            return "Praca zdalna";
        case "business-trips":
            return "Delegacje";
        default:
            return "Brak";
    }
}