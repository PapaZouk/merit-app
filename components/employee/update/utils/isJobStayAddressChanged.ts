import { Employee } from "../../../utils/api-client/types/Employee.ts";

type JobStayAddressFormData = {
  jobStayAddressStreet: string;
  jobStayAddressHouse: string;
  jobStayAddressCity: string;
  jobStayAddressZip: string;
  jobStayAddressState: string;
  jobStayAddressVoivodeship: string;
};

export const isJobStayAddressChanged = (
  formData: JobStayAddressFormData,
  employee: Employee,
) => {
  const { jobStayAddress } = employee.jobDetails;
  return (
    formData.jobStayAddressStreet !== jobStayAddress?.street ||
    formData.jobStayAddressHouse !== jobStayAddress?.house ||
    formData.jobStayAddressHouse !== jobStayAddress?.city ||
    formData.jobStayAddressZip !== jobStayAddress?.zip ||
    formData.jobStayAddressState !== jobStayAddress?.state ||
    formData.jobStayAddressVoivodeship !== jobStayAddress?.voivodeship
  );
};
