import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Employee } from "../../utils/api-client/types/Employee.ts";
import FormSelect, { Option } from "../../forms/FormSelect.tsx";

type EmployeeOption = {
  value: string;
  label: string;
};

type TimesheetOverviewControllerProps = {
  existingEmployees: Employee[] | null;
  setSelectedEmployee: (e: h.JSX.TargetedEvent<HTMLSelectElement>) => void;
};

export default function TimesheetOverviewController(
  { existingEmployees, setSelectedEmployee }: TimesheetOverviewControllerProps,
): h.JSX.Element {
  const [employeesOption, setEmployeesOption] = useState<
    EmployeeOption[] | null
  >(null);
  const [selectedOption, setSelectedOption] = useState<
    Employee | string | null
  >("Wszyscy");

  useEffect(() => {
    async function fetchEmployeesOptions() {
      try {
        const response = await fetch("/api/employees/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch employees");
        }

        let employees: Employee[] = (await response.json()).result;

        if (existingEmployees) {
          employees = employees.filter((employee: Employee) => {
            return existingEmployees.some((existingEmployee: Employee) => {
              return existingEmployee._id === employee._id;
            });
          });
        }

        const options: EmployeeOption[] = employees.map(
          (employee: Employee) => {
            return {
              value: employee._id,
              label:
                `${employee.personalData.firstName} ${employee.personalData.lastName}`,
            };
          },
        );
        setEmployeesOption(options);
      } catch (error) {
        console.error("Error while fetching employees", error);
      }
    }

    if (!employeesOption) {
      fetchEmployeesOptions();
    }
  }, []);

  const handleEmployeeChange = (e: h.JSX.TargetedEvent<HTMLSelectElement>) => {
    const selectedOption =
      existingEmployees?.find((employee: Employee) =>
        employee._id === e.target.value
      ) ?? null;
    setSelectedOption(selectedOption);

    if (setSelectedEmployee) {
      setSelectedEmployee(e);
    }
  };

  return (
    <div class="ml-4 flex flex-col md:flex-row items-center mb-4">
      <div class="flex flex-col w-full md:flex-row md:w-auto items-center mb-2 md:mb-0">
        <label htmlFor="year" class="text-gray-800 w-full md:w-auto mr-2 mb-2">
          Wybierz pracownika:
        </label>
        <FormSelect
          htmlFor={"selectedEmployee"}
          text={"Wybierz pracownika"}
          selectedOption={"Wszyscy"}
          options={employeesOption ? employeesOption as Option[] : []}
          value={selectedOption ? selectedOption._id : ""}
          extraValues={["Wszyscy"]}
          handleChange={handleEmployeeChange}
          hasLabel={false}
          extraClass={"w-full md:w-48 mr-4"}
        />
      </div>
    </div>
  );
}
