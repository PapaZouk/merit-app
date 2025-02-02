import { Employee } from "../../../../utils/api-client/types/Employee.ts";

type EmployeeAddress2FormState = {
  street2: string;
  house2: string;
  city2: string;
  zip2: string;
  state2: string;
  voivodeship2: string;
};

export const createEmployeeAddress2UpdateRequest = (
  formData: EmployeeAddress2FormState,
  employee: Employee,
  hasAddress2Changed: boolean,
) => {
  return {
    _id: employee._id,
    personalData: {
      ...employee.personalData,
      address2: {
        street2: formData.street2,
        house2: formData.house2,
        city2: formData.city2,
        zip2: formData.zip2,
        state2: formData.state2,
        voivodeship2: formData.voivodeship2,
        address2History: hasAddress2Changed
          ? [
            ...employee.personalData.address2.address2History,
            {
              street2Before: employee.personalData?.address2?.street2,
              street2After: formData.street2,
              house2Before: employee.personalData?.address2?.house2,
              house2After: formData.house2,
              city2Before: employee.personalData?.address2?.city2,
              city2After: formData.city2,
              zip2Before: employee.personalData?.address2?.zip2,
              zip2After: formData.zip2,
              state2Before: employee.personalData?.address2?.state2,
              state2After: formData.state2,
              voivodeship2Before: employee.personalData?.address2
                ?.voivodeship2,
              voivodeship2After: formData.voivodeship2,
              changeDate: new Date().toISOString(),
            },
          ]
          : employee.personalData.address2.address2History,
      },
    },
    jobDetails: { ...employee.jobDetails },
  };
};
