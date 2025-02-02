import {Employee} from "../../../../utils/api-client/types/Employee.ts";

type EmployeePersonalDataFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    pesel: string;
    clothSize: string;
    nip: number;
}

export const createEmployeePersonalDataUpdateRequest = (
    formData: EmployeePersonalDataFormData,
    employee: Employee,
    hasPersonalDataChanged: boolean,
) => {
    return {
        _id: employee._id,
        personalData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            pesel: formData.pesel,
            clothSize: formData.clothSize,
            nip: formData.nip,
            address1: employee.personalData.address1,
            address2: employee.personalData.address2,
            personalDataHistory: hasPersonalDataChanged
                ? [
                    ...employee.personalData.personalDataHistory,
                    {
                        firstNameBefore: employee.personalData.firstName,
                        firstNameAfter: formData.firstName,
                        lastNameBefore: employee.personalData.lastName,
                        lastNameAfter: formData.lastName,
                        emailBefore: employee.personalData.email,
                        emailAfter: formData.email,
                        phoneBefore: employee.personalData.phone,
                        phoneAfter: formData.phone,
                        peselBefore: employee.personalData.pesel,
                        peselAfter: formData.pesel,
                        clothSizeBefore: employee.personalData.clothSize,
                        clothSizeAfter: formData.clothSize,
                        nipBefore: employee.personalData.nip,
                        nipAfter: formData.nip,
                        changeDate: new Date().toISOString(),
                    },
                ]
                : employee.personalData.personalDataHistory,
        },
        jobDetails: {
            ...employee.jobDetails,
            salary: { ...employee.jobDetails.salary },
        },
    };
}