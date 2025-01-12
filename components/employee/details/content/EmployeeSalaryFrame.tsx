import {h} from "preact";
import {Employee} from "../../../utils/api-client/types/Employee.ts";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import HistoryDisplayFrame from "./HistoryDisplayFrame.tsx";

type EmployeeSalaryFrameProps = {
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function EmployeeSalaryFrame(
  { employeeData, expandedRows, toggleRow }: EmployeeSalaryFrameProps,
): h.JSX.Element {
  const salaryHistoryFields = [
    {
      label: "Wynagrodzenie podstawowe",
      before: "salaryBefore",
      after: "salaryAfter",
    },
    {
      label: "Stawka godzinowa",
      before: "hourlyRateBefore",
      after: "hourlyRateAfter",
    },
    { label: "Waluta", before: "currencyBefore", after: "currencyAfter" },
    {
      label: "Konto bankowe",
      before: "bankAccountBefore",
      after: "bankAccountAfter",
    },
    { label: "Nazwa banku", before: "bankNameBefore", after: "bankNameAfter" },
  ];

  return (
    <>
      <EmployeeDetailsFrame
        title={"Wynagrodzenie"}
        editLink={`/hr/employee/edit/salary/${employeeData._id}`}
        size={"2"}
      >
        <>
          <EmployeeDetailsProperty
            name={"Wynagrodzenie podstawowe"}
            employeeData={employeeData.jobDetails.salary.baseSalary}
          />
          <EmployeeDetailsProperty
            name={"Waluta"}
            employeeData={employeeData.jobDetails.salary.currency}
          />
          <EmployeeDetailsProperty
            name={"Stawka godzinowa"}
            employeeData={employeeData.jobDetails.salary.hourlyRate}
          />
          <EmployeeDetailsProperty
            name={"Konto bankowe"}
            employeeData={employeeData.jobDetails.salary.bankAccount}
          />
          <EmployeeDetailsProperty
            name={"Nazwa banku"}
            employeeData={employeeData.jobDetails.salary.bankName}
          />
        </>
      </EmployeeDetailsFrame>
      <EmployeeDetailsFrame
        title={"Historia zmian wynagrodzenia"}
        size={"2"}
      >
        <HistoryDisplayFrame
          history={employeeData.jobDetails.salary.salaryHistory}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          fields={salaryHistoryFields}
        />
      </EmployeeDetailsFrame>
    </>
  );
}
