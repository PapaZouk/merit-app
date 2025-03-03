import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import BackButton from "../../components/common/buttons/BackButton.tsx";
import FormUpdateHeader from "../../components/employee/formUpdateHeader.tsx";
import { useEffect, useState } from "preact/hooks";
import FormUpdateNavigation from "../../components/employee/details/navigation/FormUpdateNavigation.tsx";
import FormUpdateContentLayout from "../../components/employee/details/content/FormUpdateContentLayout.tsx";
import Loader from "../../components/common/loader/loader.tsx";

type EmployeeDetailsProps = {
  employeeId: string;
};

export default function EmployeeDetails(
  { employeeId }: EmployeeDetailsProps,
) {
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>(
    "personalData",
  );

  useEffect(() => {
    if (!employeeId) {
      console.error("Missing employeeId");
      return;
    }

    async function fetchEmployee() {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }

      const responseBody = await response.json();
      setEmployeeData(responseBody.result);
    }

    if (!employeeData) {
      fetchEmployee();
    }
  }, []);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!employeeId || !employeeData) {
    return <Loader />;
  }

  return (
    <div class="bg-white p-4 md:p-4 rounded-lg shadow-lg text-gray-800 w-full">
      <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6 mt-2">
        <BackButton href="/hr/employees/overview" />
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
