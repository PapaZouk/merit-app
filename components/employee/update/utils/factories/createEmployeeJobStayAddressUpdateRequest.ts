import { Employee } from "../../../../utils/api-client/types/Employee.ts";

type JobStayAddressFormData = {
  jobStayAddressStreet: string;
  jobStayAddressHouse: string;
  jobStayAddressCity: string;
  jobStayAddressZip: string;
  jobStayAddressState: string;
  jobStayAddressVoivodeship: string;
};

export const createEmployeeJobStayAddressUpdateRequest = (
  formData: JobStayAddressFormData,
  employee: Employee,
  hasJobStayAddressChanged: boolean,
) => {
  return {
    _id: employee._id,
    personalData: employee.personalData,
    jobDetails: {
      ...employee.jobDetails,
      jobStayAddress: {
        street: formData.jobStayAddressStreet,
        house: formData.jobStayAddressHouse,
        city: formData.jobStayAddressCity,
        zip: formData.jobStayAddressZip,
        state: formData.jobStayAddressState,
        voivodeship: formData.jobStayAddressVoivodeship,
        jobStayAddressHistory: hasJobStayAddressChanged
          ? [
            ...employee.jobDetails.jobStayAddress
              ?.jobStayAddressHistory ?? [],
            {
              streetBefore: employee.jobDetails.jobStayAddress?.street,
              streetAfter: formData.jobStayAddressStreet,
              houseBefore: employee.jobDetails.jobStayAddress?.house,
              houseAfter: formData.jobStayAddressHouse,
              cityBefore: employee.jobDetails.jobStayAddress?.city,
              cityAfter: formData.jobStayAddressCity,
              stateBefore: employee.jobDetails.jobStayAddress?.state,
              stateAfter: formData.jobStayAddressState,
              zipBefore: employee.jobDetails.jobStayAddress?.zip,
              zipAfter: formData.jobStayAddressZip,
              voivodeshipBefore: employee.jobDetails.jobStayAddress
                ?.voivodeship,
              voivodeshipAfter: formData.jobStayAddressVoivodeship,
              changeDate: new Date().toISOString(),
            },
          ]
          : employee.jobDetails.jobStayAddress?.jobStayAddressHistory,
      },
    },
  };
};
