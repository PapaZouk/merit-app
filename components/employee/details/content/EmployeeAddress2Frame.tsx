import { h } from "preact";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import { getCountryMapper } from "../../mappers/getCountryMapper.tsx";
import { getVoivodeshipMapper } from "../../mappers/getVoivodeshipMapper.ts";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import { Employee } from "../../../utils/api-client/types/Employee.ts";
import HistoryDisplayFrame from "./HistoryDisplayFrame.tsx";

type EmployeeAddress2FrameProps = {
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function EmployeeAddress2Frame(
  { employeeData, expandedRows, toggleRow }: EmployeeAddress2FrameProps,
): h.JSX.Element {
  const address2HistoryFields = [
    {
      label: "Ulica",
      before: "street2Before",
      after: "street2After",
    },
    {
      label: "Dom",
      before: "house2Before",
      after: "house2After",
    },
    {
      label: "Miasto",
      before: "city2Before",
      after: "city2After",
    },
    {
      label: "Kod pocztowy",
      before: "zip2Before",
      after: "zip2After",
    },
    {
      label: "Państwo",
      before: "state2Before",
      after: "state2After",
    },
    {
      label: "Województwo",
      before: "voivodeship2Before",
      after: "voivodeship2After",
    },
  ];

  return (
    <>
      <EmployeeDetailsFrame
          title={"Adres korespondencyjny"}
          size={"2"}
          editLink={`/hr/employee/edit/address2/${employeeData._id}`}
      >
        <>
          <EmployeeDetailsProperty
              name={"Ulica"}
              employeeData={employeeData.personalData.address2?.street2 ??
                  "Brak danych"}
          />
          <EmployeeDetailsProperty
              name={"Dom"}
              employeeData={employeeData.personalData.address2?.house2 ??
                  "Brak danych"}
          />
          <EmployeeDetailsProperty
              name={"Miasto"}
              employeeData={employeeData.personalData.address2?.city2 ??
                  "Brak danych"}
          />
          <EmployeeDetailsProperty
              name={"Kod Pocztowy"}
              employeeData={employeeData.personalData.address2?.zip2 ??
                  "Brak danych"}
          />
          <EmployeeDetailsProperty
              name={"Państwo"}
              employeeData={getCountryMapper(
                  employeeData.personalData.address2?.state2 ?? "Brak danych",
              )}
          />
          <EmployeeDetailsProperty
              name={"Województwo"}
              employeeData={getVoivodeshipMapper(
                  employeeData.personalData.address2?.voivodeship2 ??
                  "Brak danych",
              )}
          />
        </>
      </EmployeeDetailsFrame>
        <EmployeeDetailsFrame
            title={"Historia zmian adresu korespondencyjnego"}
            size={"2"}
        >
            <HistoryDisplayFrame
                history={employeeData.personalData.address2?.address2History}
                expandedRows={expandedRows}
                toggleRow={toggleRow}
                fields={address2HistoryFields}
            />
        </EmployeeDetailsFrame>
    </>
  );
}
