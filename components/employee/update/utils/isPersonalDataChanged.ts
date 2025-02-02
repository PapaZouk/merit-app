import {Employee} from "../../../utils/api-client/types/Employee.ts";

type PersonalDataFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pesel: string;
  clothSize: string;
  nip: number|null;
};

export const isPersonalDataChanged = (
  formData: PersonalDataFormData,
  employee: Employee,
): boolean => {
  const { personalData } = employee;
  return (
    formData.firstName !== personalData.firstName ||
    formData.lastName !== personalData.lastName ||
    formData.email !== personalData.email ||
    formData.phone !== personalData.phone ||
    formData.pesel !== personalData.pesel ||
    formData.clothSize !== personalData.clothSize ||
    formData.nip !== personalData.nip
  );
};
