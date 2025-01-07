import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { updateEmployeeById } from "../../../components/utils/api-client/client.ts";
import EmployeeAddress2Form from "../../../components/employee/forms/EmployeeAddress2Form.tsx";

type EmployeeUpdateAddress2Props = {
  employeeData: Employee;
  updateConfig: {
    url: string;
    token: string;
  };
};

export default function EmployeeUpdateAddress2({
  employeeData,
  updateConfig,
}: EmployeeUpdateAddress2Props) {
  const [formData, setFormData] = useState({
    street2: employeeData.personalData.address2.street2 ?? "",
    house2: employeeData.personalData.address2.house2 ?? "",
    city2: employeeData.personalData.address2.city2 ?? "",
    zip2: employeeData.personalData.address2.zip2 ?? "",
    state2: employeeData.personalData.address2.state2 ?? "",
    voivodeship2: employeeData.personalData.address2.voivodeship2 ?? "",
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

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: {
        ...employeeData.personalData,
        address2: {
          street2: formData.street2,
          house2: formData.house2,
          city2: formData.city2,
          zip2: formData.zip2,
          state2: formData.state2,
          voivodeship2: formData.voivodeship2,
        },
      },
      jobDetails: { ...employeeData.jobDetails },
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
    <EmployeeAddress2Form
      employeeData={employeeData}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
