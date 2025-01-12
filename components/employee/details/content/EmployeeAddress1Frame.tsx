import { h } from "preact";
import { Employee } from "../../../utils/api-client/types/Employee.ts";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import { getCountryMapper } from "../../mappers/getCountryMapper.tsx";
import { getVoivodeshipMapper } from "../../mappers/getVoivodeshipMapper.ts";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";

type EmployeeAddress1FrameProps = {
  employeeData: Employee;
};

export default function EmployeeAddress1Frame(
  { employeeData }: EmployeeAddress1FrameProps,
): h.JSX.Element {
  return (
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
  );
}
