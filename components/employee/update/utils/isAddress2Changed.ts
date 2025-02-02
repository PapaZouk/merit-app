import {Employee} from "../../../utils/api-client/types/Employee.ts";

type Address2FormData = {
    street2: string | null;
    house2: string | null;
    city2: string | null;
    zip2: string | null;
    state2: string | null;
    voivodeship2: string | null;
}

export const isAddress2Changed = (formData: Address2FormData, employee: Employee) => {
    return (
        formData.street2 !== employee.personalData.address2.street2 ||
        formData.house2 !== employee.personalData.address2.house2 ||
        formData.city2 !== employee.personalData.address2.city2 ||
        formData.zip2 !== employee.personalData.address2.zip2 ||
        formData.state2 !== employee.personalData.address2.state2 ||
        formData.voivodeship2 !== employee.personalData.address2.voivodeship2
    )
}