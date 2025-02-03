import { EmployeeFormData } from "../../types/EmployeeFormData.ts";
import { Employee } from "../../../utils/api-client/types/Employee.ts";

export const createNewEmployeeRequest = (
  employee: EmployeeFormData,
): Employee => {
  if (employee.state1 instanceof Object) {
    employee.state1 = employee.state1.label;
  }
  if (employee.state2 instanceof Object) {
    employee.state2 = employee.state2.label;
  }
  if (employee.voivodeship1 instanceof Object) {
    employee.voivodeship1 = employee.voivodeship1.value;
  }
  if (employee.voivodeship2 instanceof Object) {
    employee.voivodeship2 = employee.voivodeship2.label;
  }

  return {
    _id: "",
    personalData: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      pesel: employee.pesel,
      nip: employee.nip,
      clothSize: employee.clothSize,
      personalDataHistory: [],
      address1: {
        street1: employee.street1,
        house1: employee.house1,
        city1: employee.city1,
        zip1: employee.zip1,
        state1: employee.state1,
        voivodeship1: employee.voivodeship1,
        address1History: [],
      },
      address2: {
        street2: employee.street2,
        house2: employee.house2,
        city2: employee.city2,
        zip2: employee.zip2,
        state2: employee.state2,
        voivodeship2: employee.voivodeship2,
        address2History: [],
      },
    },
    jobDetails: {
      status: employee.status,
      jobTitle: employee.jobTitle,
      department: employee.department,
      startDate: employee.startDate,
      endDate: employee.endDate,
      contractType: employee.contractType,
      workSchedule: employee.workSchedule,
      insuranceType: employee.insuranceType,
      annualLeaveDays: Number.parseInt(
        String(employee.annualLeaveDays),
        10,
      ),
      jobDetailsHistory: [],
      salary: {
        baseSalary: Number.parseInt(String(employee.baseSalary), 10),
        currency: employee.currency,
        hourlyRate: Number.parseInt(String(employee.hourlyRate), 10),
        bankAccount: employee.bankAccount,
        bankName: employee.bankName,
        salaryHistory: [],
      },
    },
  };
};
