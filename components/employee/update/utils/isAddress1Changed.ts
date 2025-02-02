import {Employee} from "../../../utils/api-client/types/Employee.ts";

export type Address1FormData = {
    street1: string;
    house1: string;
    city1: string;
    zip1: string;
    state1: string;
    voivodeship1: string;
}

export const isAddress1Changed = (
  formData: Address1FormData,
  employee: Employee,
): boolean => {
  return (
    formData.street1 !== employee.personalData.address1.street1 ||
    formData.house1 !== employee.personalData.address1.house1 ||
    formData.city1 !== employee.personalData.address1.city1 ||
    formData.zip1 !== employee.personalData.address1.zip1 ||
    formData.state1 !== employee.personalData.address1.state1 ||
    formData.voivodeship1 !== employee.personalData.address1.voivodeship1
  );
};
