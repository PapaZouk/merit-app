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
import HistoryDisplayFrame from "./HistoryDisplayFrame.tsx";

type EmployeeJobDetailsFrameProps = {
  employeeData: Employee;
  expandedRows: number[];
  toggleRow: (index: number) => void;
};

export default function EmployeeJobDetailsFrame(
  { employeeData, expandedRows, toggleRow }: EmployeeJobDetailsFrameProps,
): h.JSX.Element {
  const jobDetailsHistoryFields = [
    {
      label: "Status",
      before: "statusBefore",
      after: "statusAfter",
    },
    {
      label: "Stanowisko",
      before: "jobTitleBefore",
      after: "jobTitleAfter",
    },
    {
      label: "Dział",
      before: "departmentBefore",
      after: "departmentAfter",
    },
    {
      label: "Data Zatrudnienia",
      before: "startDateBefore",
      after: "startDateAfter",
    },
    {
      label: "Data Zwolnienia",
      before: "endDateBefore",
      after: "endDateAfter",
    },
    {
      label: "Typ Umowy",
      before: "contractTypeBefore",
      after: "contractTypeAfter",
    },
    {
      label: "Grafik Pracy",
      before: "workScheduleBefore",
      after: "workScheduleAfter",
    },
    {
      label: "Typ Ubezpieczenia",
      before: "insuranceTypeBefore",
      after: "insuranceTypeAfter",
    },
    {
      label: "Dni urlopowe",
      before: "annualLeaveDaysBefore",
      after: "annualLeaveDaysAfter",
    },
  ];

  const mappers = {
    statusBefore: getStatusMapper,
    statusAfter: getStatusMapper,
    jobTitleBefore: getJobTitle,
    jobTitleAfter: getJobTitle,
    departmentBefore: getDepartment,
    departmentAfter: getDepartment,
    contractTypeBefore: getContractType,
    contractTypeAfter: getContractType,
    workScheduleBefore: getWorkSchedule,
    workScheduleAfter: getWorkSchedule,
    insuranceTypeBefore: getInsuranceType,
    insuranceTypeAfter: getInsuranceType,
  }

  return (
    <>
      <EmployeeDetailsFrame
        title={"Dane Zawodowe"}
        editLink={`/hr/employee/edit/jobdetails/${employeeData._id}`}
        size={"1"}
      >
        <>
          <EmployeeDetailsProperty
            name={"Status"}
            employeeData={getStatusMapper(employeeData.jobDetails.status)}
          />
          <EmployeeDetailsProperty
            name={"Stanowisko"}
            employeeData={getJobTitle(employeeData.jobDetails.jobTitle)}
          />
          <EmployeeDetailsProperty
            name={"Dział"}
            employeeData={getDepartment(employeeData.jobDetails.department)}
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
            employeeData={getContractType(employeeData.jobDetails.contractType)}
          />
          <EmployeeDetailsProperty
            name={"Grafik Pracy"}
            employeeData={getWorkSchedule(employeeData.jobDetails.workSchedule)}
          />
          <EmployeeDetailsProperty
            name={"Typ Ubezpieczenia"}
            employeeData={getInsuranceType(employeeData.jobDetails.insuranceType)}
          />
          <EmployeeDetailsProperty
            name={"Dni urlopowe"}
            employeeData={employeeData.jobDetails.annualLeaveDays}
          />
        </>
      </EmployeeDetailsFrame>
      <EmployeeDetailsFrame
        title={"Historia zmian danych zawodowych"}
        size={"2"}
      >
        <HistoryDisplayFrame
          history={employeeData.jobDetails.jobDetailsHistory}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          fields={jobDetailsHistoryFields}
          mappers={mappers}
        />
      </EmployeeDetailsFrame>
    </>
  );
}
