import { h } from "preact";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import { getCountryMapper } from "../../mappers/getCountryMapper.tsx";
import { getVoivodeshipMapper } from "../../mappers/getVoivodeshipMapper.ts";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import { Employee } from "../../../utils/api-client/types/Employee.ts";
import HistoryDisplayFrame from "./HistoryDisplayFrame.tsx";

type EmployeeJobStayAddressFrameProps = {
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function EmployeeJobStayAddressFrame(
  { employeeData, expandedRows, toggleRow }: EmployeeJobStayAddressFrameProps,
): h.JSX.Element {
  const jobStayAddressHistoryFields = [
    {
      label: "Ulica",
      before: "streetBefore",
      after: "streetAfter",
    },
    {
      label: "Dom",
      before: "houseBefore",
      after: "houseAfter",
    },
    {
      label: "Miasto",
      before: "cityBefore",
      after: "cityAfter",
    },
    {
      label: "Kod pocztowy",
      before: "zipBefore",
      after: "zipAfter",
    },
    {
      label: "Państwo",
      before: "stateBefore",
      after: "stateAfter",
    },
    {
      label: "Województwo",
      before: "voivodeshipBefore",
      after: "voivodeshipAfter",
    },
  ];

  return (
    <>
      <EmployeeDetailsFrame
        title={"Adres noclegu"}
        size={"2"}
        editLink={`/hr/employee/edit/jobstayaddress/${employeeData._id}`}
      >
        <>
          <EmployeeDetailsProperty
            name={"Ulica"}
            employeeData={employeeData.jobDetails.jobStayAddress?.street ??
              "Brak danych"}
          />
          <EmployeeDetailsProperty
            name={"Dom"}
            employeeData={employeeData.jobDetails.jobStayAddress?.house ??
              "Brak danych"}
          />
          <EmployeeDetailsProperty
            name={"Miasto"}
            employeeData={employeeData.jobDetails.jobStayAddress?.city ??
              "Brak danych"}
          />
          <EmployeeDetailsProperty
            name={"Kod pocztowy"}
            employeeData={employeeData.jobDetails.jobStayAddress?.zip ??
              "Brak danych"}
          />
          <EmployeeDetailsProperty
            name={"Państwo"}
            employeeData={getCountryMapper(
              employeeData.jobDetails.jobStayAddress?.state ?? "Brak danych",
            )}
          />
          <EmployeeDetailsProperty
            name={"Województwo"}
            employeeData={getVoivodeshipMapper(
              employeeData.jobDetails.jobStayAddress?.voivodeship ??
                "Brak danych",
            )}
          />
        </>
      </EmployeeDetailsFrame>
      <EmployeeDetailsFrame
        title={"Historia zmian adresu noclegu"}
        size={"2"}
      >
        <HistoryDisplayFrame
          history={employeeData.jobDetails.jobStayAddress
            ?.jobStayAddressHistory ?? []}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          fields={jobStayAddressHistoryFields}
        />
      </EmployeeDetailsFrame>
    </>
  );
}
