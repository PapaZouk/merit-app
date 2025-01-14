import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import BackButton from "../../components/buttons/BackButton.tsx";
import FormUpdateHeader from "../../components/employee/formUpdateHeader.tsx";
import { useState } from "preact/hooks";
import FormUpdateNavigation from "../../components/employee/details/navigation/FormUpdateNavigation.tsx";
import FormUpdateContentLayout from "../../components/employee/details/content/FormUpdateContentLayout.tsx";

type EmployeeDetailsProps = {
  employeeData: Employee;
};

export default function EmployeeDetails(
  { employeeData }: EmployeeDetailsProps,
) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>(
    "personalData",
  );

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div class="bg-white p-4 md:p-4 rounded-lg shadow-lg text-gray-800 w-full">
      <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6 mt-2">
        <BackButton href={"/hr/employees/overview"} />
      </div>

      <FormUpdateHeader employeeData={employeeData} />
      <div class="w-full">
        <FormUpdateNavigation onSelect={setSelectedSection} />
        <FormUpdateContentLayout
          selectedSection={selectedSection}
          employeeData={employeeData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      </div>
    </div>
  );
}