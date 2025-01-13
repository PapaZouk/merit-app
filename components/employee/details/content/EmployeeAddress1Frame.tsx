import { h } from "preact";
import { Employee } from "../../../utils/api-client/types/Employee.ts";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import { getCountryMapper } from "../../mappers/getCountryMapper.tsx";
import { getVoivodeshipMapper } from "../../mappers/getVoivodeshipMapper.ts";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import HistoryDisplayFrame from "./HistoryDisplayFrame.tsx";

type EmployeeAddress1FrameProps = {
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function EmployeeAddress1Frame(
  { employeeData, expandedRows, toggleRow }: EmployeeAddress1FrameProps,
): h.JSX.Element {
  const address1HistoryFields = [
    {
      label: "Ulica",
      before: "street1Before",
      after: "street1After",
    },
    {
      label: "Dom",
      before: "house1Before",
      after: "house1After",
    },
    {
      label: "Miasto",
      before: "city1Before",
      after: "city1After",
    },
    {
      label: "Kod pocztowy",
      before: "zip1Before",
      after: "zip1After",
    },
    {
      label: "Państwo",
      before: "state1Before",
      after: "state1After",
    },
    {
      label: "Województwo",
      before: "voivodeship1Before",
      after: "voivodeship1After",
    },
  ];

  return (
    <>
      <EmployeeDetailsFrame
        title={"Adres zamieszkania"}
        size={"2"}
        editLink={`/hr/employee/edit/address1/${employeeData._id}`}
      >
        <>
          <EmployeeDetailsProperty
            name={"Ulica"}
            employeeData={employeeData.personalData.address1.street1}
          />
          <EmployeeDetailsProperty
            name={"Dom"}
            employeeData={employeeData.personalData.address1.house1}
          />
          <EmployeeDetailsProperty
            name={"Miasto"}
            employeeData={employeeData.personalData.address1.city1}
          />
          <EmployeeDetailsProperty
            name={"Kod Pocztowy"}
            employeeData={employeeData.personalData.address1.zip1}
          />
          <EmployeeDetailsProperty
            name={"Państwo"}
            employeeData={getCountryMapper(
              employeeData.personalData.address1.state1,
            )}
          />
          <EmployeeDetailsProperty
            name={"Województwo"}
            employeeData={getVoivodeshipMapper(
              employeeData.personalData.address1.voivodeship1,
            )}
          />
        </>
      </EmployeeDetailsFrame>
      <EmployeeDetailsFrame
        title={"Historia zmian adresu zamieszka"}
        size={"2"}
      >
        <HistoryDisplayFrame
          history={employeeData.personalData.address1.address1History}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          fields={address1HistoryFields}
        />
      </EmployeeDetailsFrame>
    </>
  );
}
