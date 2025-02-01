import {
  EmployeeStatus,
  EmployeeStatusPL,
} from "../../types/EmployeeStatus.ts";

export const status = [
  { value: EmployeeStatus.ACTIVE, label: EmployeeStatusPL.ACTIVE },
  { value: EmployeeStatus.INACTIVE, label: EmployeeStatusPL.INACTIVE },
  { value: EmployeeStatus.SUSPENDED, label: EmployeeStatusPL.SUSPENDED },
  { value: EmployeeStatus.TERMINATED, label: EmployeeStatusPL.TERMINATED },
  { value: EmployeeStatus.ON_LEAVE, label: EmployeeStatusPL.ON_LEAVE },
  { value: EmployeeStatus.RETIRED, label: EmployeeStatusPL.RETIRED },
  { value: EmployeeStatus.ARCHIVED, label: EmployeeStatusPL.ARCHIVED },
];
