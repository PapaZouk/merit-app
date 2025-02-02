import { Employee } from "../../../../utils/api-client/types/Employee.ts";

type EmployeeAddress1FormState = {
  street1: string;
  house1: string;
  city1: string;
  zip1: string;
  state1: string;
  voivodeship1: string;
};

export const createEmployeeAddress1UpdateRequest = (
  formData: EmployeeAddress1FormState,
  employee: Employee,
  hasAddress1Changed: boolean,
) => {
  return {
    _id: employee._id,
    personalData: {
      ...employee.personalData,
      address1: {
        street1: formData.street1,
        house1: formData.house1,
        city1: formData.city1,
        zip1: formData.zip1,
        state1: formData.state1,
        voivodeship1: formData.voivodeship1,
        address1History: hasAddress1Changed
          ? [
            ...employee.personalData.address1.address1History,
            {
              street1Before: employee.personalData.address1.street1,
              street1After: formData.street1,
              house1Before: employee.personalData.address1.house1,
              house1After: formData.house1,
              city1Before: employee.personalData.address1.city1,
              city1After: formData.city1,
              zip1Before: employee.personalData.address1.zip1,
              zip1After: formData.zip1,
              state1Before: employee.personalData.address1.state1,
              state1After: formData.state1,
              voivodeship1Before: employee.personalData.address1.voivodeship1,
              voivodeship1After: formData.voivodeship1,
              changeDate: new Date().toISOString(),
            },
          ]
          : employee.personalData.address1.address1History,
      },
    },
    jobDetails: { ...employee.jobDetails },
  };
};
