import { h } from "preact";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import { getCountryMapper } from "../../mappers/getCountryMapper.tsx";
import { getVoivodeshipMapper } from "../../mappers/getVoivodeshipMapper.ts";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import { Employee } from "../../../utils/api-client/types/Employee.ts";

type EmployeeAddress2FrameProps = {
  employeeData: Employee;
};

export default function EmployeeAddress2Frame(
  { employeeData }: EmployeeAddress2FrameProps,
): h.JSX.Element {
  return (
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
  );
}
