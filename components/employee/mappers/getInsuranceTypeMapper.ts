import {Employee} from "../../utils/api-client/types/Employee.ts";

export function getInsuranceType(employeeData: Employee) {
    switch (employeeData.jobDetails.insuranceType.toLowerCase()) {
        case "a1":
            return "A1";
        case "commercial":
            return "Ubezpieczenie komercyjne";
        default:
            return "Brak";
    }
}