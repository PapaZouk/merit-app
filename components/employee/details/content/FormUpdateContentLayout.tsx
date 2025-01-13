import { Employee } from "../../../utils/api-client/types/Employee.ts";
import EmployeeJobDetailsFrame from "./EmployeeJobDetailsFrame.tsx";
import EmployeeAddress2Frame from "./EmployeeAddress2Frame.tsx";
import EmployeeSalaryFrame from "./EmployeeSalaryFrame.tsx";
import EmployeeAddress1Frame from "./EmployeeAddress1Frame.tsx";
import EmployeePersonalDataFrame from "./EmployeePersonalDataFrame.tsx";

type FormUpdateContentLayoutProps = {
  selectedSection: string;
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function FormUpdateContentLayout({
  selectedSection,
  employeeData,
  expandedRows,
  toggleRow,
}: FormUpdateContentLayoutProps) {
  return (
    <div class="flex flex-col w-full p-4 sm:p-6">
      {selectedSection === "personalData" && (
        <EmployeePersonalDataFrame
          employeeData={employeeData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      )}
      {selectedSection === "address1" && (
        <EmployeeAddress1Frame
          employeeData={employeeData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      )}
      {selectedSection === "address2" && (
        <EmployeeAddress2Frame
          employeeData={employeeData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      )}
      {selectedSection === "jobDetails" && (
        <EmployeeJobDetailsFrame
          employeeData={employeeData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      )}
      {selectedSection === "salary" && (
        <EmployeeSalaryFrame
          employeeData={employeeData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      )}
    </div>
  );
}