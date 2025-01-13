import EmployeePersonalDataForm from "../../../components/employee/forms/EmployeePersonalDataForm.tsx";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { updateEmployeeById } from "../../../components/utils/api-client/client.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { useState } from "preact/hooks";

type EmployeeUpdateProps = {
  employeeData: Employee;
  updateConfig: {
    url: string;
    token: string;
  };
};

export default function EmployeeUpdatePersonalData(
  { employeeData, updateConfig }: EmployeeUpdateProps,
) {
  const [formData, setFormData] = useState({
    firstName: employeeData.personalData.firstName,
    lastName: employeeData.personalData.lastName,
    email: employeeData.personalData.email,
    phone: employeeData.personalData.phone,
    pesel: employeeData.personalData.pesel,
    clothSize: employeeData.personalData.clothSize,
    nip: employeeData.personalData.nip ?? 0,
  });

  const handleChange = (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    const hasPersonalDataChanged =
      formData.firstName !== employeeData.personalData.firstName ||
      formData.lastName !== employeeData.personalData.lastName ||
      formData.email !== employeeData.personalData.email ||
      formData.phone !== employeeData.personalData.phone ||
      formData.pesel !== employeeData.personalData.pesel ||
      formData.clothSize !== employeeData.personalData.clothSize ||
      formData.nip !== employeeData.personalData.nip;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        pesel: formData.pesel,
        clothSize: formData.clothSize,
        nip: formData.nip,
        address1: employeeData.personalData.address1,
        address2: employeeData.personalData.address2,
        personalDataHistory: hasPersonalDataChanged
        ? [
            ...employeeData.personalData.personalDataHistory,
              {
                firstNameBefore: employeeData.personalData.firstName,
                firstNameAfter: formData.firstName,
                lastNameBefore: employeeData.personalData.lastName,
                lastNameAfter: formData.lastName,
                emailBefore: employeeData.personalData.email,
                emailAfter: formData.email,
                phoneBefore: employeeData.personalData.phone,
                phoneAfter: formData.phone,
                peselBefore: employeeData.personalData.pesel,
                peselAfter: formData.pesel,
                clothSizeBefore: employeeData.personalData.clothSize,
                clothSizeAfter: formData.clothSize,
                nipBefore: employeeData.personalData.nip,
                nipAfter: formData.nip,
                changeDate: new Date().toISOString(),
              },
            ]
            : employeeData.personalData.personalDataHistory,
      },
      jobDetails: {
        ...employeeData.jobDetails,
        salary: { ...employeeData.jobDetails.salary },
      },
    };

    await updateEmployeeById(
      updatedData._id,
      updatedData,
      updateConfig.url,
      updateConfig.token,
    );

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <EmployeePersonalDataForm
      employeeData={employeeData}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
