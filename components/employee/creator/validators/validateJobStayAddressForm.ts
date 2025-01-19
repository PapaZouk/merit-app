import {EmployeeFormData} from "../../types/EmployeeFormData.ts";

export function validateJobStayAddressForm(data: EmployeeFormData) {
    const errors: { [key: string]: string } = {};

    if (data.jobStayAddressStreet && data.jobStayAddressStreet.length < 3) {
        errors.jobStayAddressStreet = "Ulica musi mieć co najmniej 3 znaki";
    }

    if (data.jobStayAddressCity && data.jobStayAddressCity.length < 3) {
        errors.jobStayAddressCity = "Miasto musi mieć co najmniej 3 znaki";
    }

    return errors;
}