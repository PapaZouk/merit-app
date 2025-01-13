import { h } from "preact";
import { Employee } from "../../../utils/api-client/types/Employee.ts";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import HistoryDisplayFrame from "./HistoryDisplayFrame.tsx";

type EmployeePersonalDataFrameProps = {
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function EmployeePersonalDataFrame(
  { employeeData, expandedRows, toggleRow }: EmployeePersonalDataFrameProps,
): h.JSX.Element {
  const personalDataHistoryFields = [
    { label: "Imię", before: "firstNameBefore", after: "firstNameAfter" },
    { label: "Nazwisko", before: "lastNameBefore", after: "lastNameAfter" },
    { label: "E-mail", before: "emailBefore", after: "emailAfter" },
    { label: "Telefon", before: "phoneBefore", after: "phoneAfter" },
    { label: "PESEL", before: "peselBefore", after: "peselAfter" },
    {
      label: "Rozmiar ubrań",
      before: "clothSizeBefore",
      after: "clothSizeAfter",
    },
    { label: "NIP", before: "nipBefore", after: "nipAfter" },
  ];

  return (
    <>
      <EmployeeDetailsFrame
        title={"Dane Osobowe"}
        editLink={`/hr/employee/edit/personal/${employeeData._id}`}
        size={"1"}
      >
        <>
          <EmployeeDetailsProperty
            name={"Imię"}
            employeeData={employeeData.personalData.firstName}
          />
          <EmployeeDetailsProperty
            name={"Nazwisko"}
            employeeData={employeeData.personalData.lastName}
          />
          <EmployeeDetailsProperty
            name={"E-mail"}
            employeeData={employeeData.personalData.email}
          />
          <EmployeeDetailsProperty
            name={"Telefon"}
            employeeData={employeeData.personalData.phone}
          />
          <EmployeeDetailsProperty
            name={"PESEL"}
            employeeData={employeeData.personalData.pesel}
          />
          <EmployeeDetailsProperty
            name={"NIP"}
            employeeData={employeeData.personalData.nip}
          />
          <EmployeeDetailsProperty
            name={"Rozmiar ubrań"}
            employeeData={employeeData.personalData.clothSize}
          />
        </>
      </EmployeeDetailsFrame>
      <EmployeeDetailsFrame
        title={"Historia zmian danych osobowych"}
        size={"2"}
      >
        <HistoryDisplayFrame
          history={employeeData.personalData.personalDataHistory}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          fields={personalDataHistoryFields}
        />
      </EmployeeDetailsFrame>
    </>
  );
}
