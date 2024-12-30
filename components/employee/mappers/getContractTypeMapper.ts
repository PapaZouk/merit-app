import {Employee} from "../../utils/api-client/types/Employee.ts";

export function getContractType(employeeData: Employee) {
    switch (employeeData.jobDetails.contractType.toLowerCase()) {
        case "b2b":
            return "Umowa B2B";
        case "uop":
            return "Umowa o Pracę";
        case "mandate":
            return "Umowa Zlecenie";
        case "specific-task":
            return "Umowa o dzieło";
        case "temporary":
            return "Umowa na Czas Określony";
        case "internship":
            return "Staż";
        case "part-time":
            return "Umowa na Część Etatu";
        default:
            return "Brak";
    }
}