import { Employee } from "../utils/api-client/types/Employee.ts";
import { getJobTitle } from "./mappers/getJobTitleMapper.ts";
import { getDepartment } from "./mappers/getDepartmentMapper.ts";
import { getContractType } from "./mappers/getContractTypeMapper.ts";
import { getInsuranceType } from "./mappers/getInsuranceTypeMapper.ts";
import { getWorkSchedule } from "./mappers/getWorkScheduleMapper.ts";
import { getStatusMapper } from "./mappers/getStatusMapper.ts";
import EmployeeDetailsProperty from "./employeeDetailsProperty.tsx";
import BackButton from "../buttons/BackButton.tsx";
import FormUpdateHeader from "./formUpdateHeader.tsx";
import EmployeeDetailsFrame from "./EmployeeDetailsFrame.tsx";

type EmployeeDetailsProps = {
  employeeData: Employee;
};

export default function EmployeeDetails(
  { employeeData }: EmployeeDetailsProps,
) {
  return (
    <div class="bg-white p-4 md:p-8 rounded-lg shadow-lg text-gray-800">
      <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6">
        <BackButton href={"/"} />
      </div>

      <FormUpdateHeader employeeData={employeeData} />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4 md:mb-8 h-full w-full">
        <EmployeeDetailsFrame
          title={"Dane Osobowe"}
          editLink={`/employee/edit/personal/${employeeData._id}`}
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
              name={"Rozmiar ubrań"}
              employeeData={employeeData.personalData.clothSize}
            />
          </>
        </EmployeeDetailsFrame>

        <EmployeeDetailsFrame
          title={"Dane Zawodowe"}
          editLink={`/employee/edit/jobdetails/${employeeData._id}`}
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

        <EmployeeDetailsFrame
          title={"Adres zamieszkania"}
          size={"2"}
          editLink={`/employee/edit/address1/${employeeData._id}`}
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
              employeeData={employeeData.personalData.address1.state1}
            />
            <EmployeeDetailsProperty
              name={"Województwo"}
              employeeData={employeeData.personalData.address1.voivodeship1}
            />
          </>
        </EmployeeDetailsFrame>

        <EmployeeDetailsFrame
          title={"Adres korespondencyjny"}
          size={"2"}
          editLink={`/employee/edit/address2/${employeeData._id}`}
        >
          <>
            <EmployeeDetailsProperty
              name={"Ulica"}
              employeeData={employeeData.personalData.address2.street2}
            />
            <EmployeeDetailsProperty
              name={"Dom"}
              employeeData={employeeData.personalData.address2.house2}
            />
            <EmployeeDetailsProperty
              name={"Miasto"}
              employeeData={employeeData.personalData.address2.city2}
            />
            <EmployeeDetailsProperty
              name={"Kod Pocztowy"}
              employeeData={employeeData.personalData.address2.zip2}
            />
            <EmployeeDetailsProperty
              name={"Państwo"}
              employeeData={employeeData.personalData.address2.state2}
            />
            <EmployeeDetailsProperty
              name={"Województwo"}
              employeeData={employeeData.personalData.address2.voivodeship2}
            />
          </>
        </EmployeeDetailsFrame>

        <EmployeeDetailsFrame
          title={"Wynagrodzenie"}
          editLink={`/employee/edit/salary/${employeeData._id}`}
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
              name={"Konto bankowe"}
              employeeData={employeeData.jobDetails.salary.bankAccount}
            />
            <EmployeeDetailsProperty
              name={"Nazwa banku"}
              employeeData={employeeData.jobDetails.salary.bankName}
            />
          </>
        </EmployeeDetailsFrame>
      </div>

      <div class="col-span-4 flex items-end justify-start">
        <BackButton href={"/"} />
      </div>
    </div>
  );
}