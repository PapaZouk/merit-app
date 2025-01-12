import { h } from "preact";
import EmployeeDetailsProperty from "../../employeeDetailsProperty.tsx";
import { getStatusMapper } from "../../mappers/getStatusMapper.ts";
import { getJobTitle } from "../../mappers/getJobTitleMapper.ts";
import { getDepartment } from "../../mappers/getDepartmentMapper.ts";
import { getContractType } from "../../mappers/getContractTypeMapper.ts";
import { getWorkSchedule } from "../../mappers/getWorkScheduleMapper.ts";
import { getInsuranceType } from "../../mappers/getInsuranceTypeMapper.ts";
import EmployeeDetailsFrame from "../../EmployeeDetailsFrame.tsx";
import { Employee } from "../../../utils/api-client/types/Employee.ts";

type EmployeeJobDetailsFrameProps = {
  employeeData: Employee;
};

export default function EmployeeJobDetailsFrame(
  { employeeData }: EmployeeJobDetailsFrameProps,
): h.JSX.Element {
  return (
    <EmployeeDetailsFrame
      title={"Dane Zawodowe"}
      editLink={`/hr/employee/edit/jobdetails/${employeeData._id}`}
      size={"1"}
    >
      <>
        <EmployeeDetailsProperty
          name={"Status"}
          employeeData={getStatusMapper(employeeData)}
        />
        <EmployeeDetailsProperty
          name={"Stanowisko"}
          employeeData={getJobTitle(employeeData)}
        />
        <EmployeeDetailsProperty
          name={"Dział"}
          employeeData={getDepartment(employeeData)}
        />
        <EmployeeDetailsProperty
          name={"Data Zatrudnienia"}
          employeeData={employeeData.jobDetails.startDate}
        />
        <EmployeeDetailsProperty
          name={"Data Zwolnienia"}
          employeeData={employeeData.jobDetails.endDate}
        />
        <EmployeeDetailsProperty
          name={"Typ Umowy"}
          employeeData={getContractType(employeeData)}
        />
        <EmployeeDetailsProperty
          name={"Grafik Pracy"}
          employeeData={getWorkSchedule(employeeData)}
        />
        <EmployeeDetailsProperty
          name={"Typ Ubezpieczenia"}
          employeeData={getInsuranceType(employeeData)}
        />
        <EmployeeDetailsProperty
          name={"Dni urlopowe"}
          employeeData={employeeData.jobDetails.annualLeaveDays}
        />
      </>
    </EmployeeDetailsFrame>
  );
}
