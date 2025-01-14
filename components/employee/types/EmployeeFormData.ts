import {getFormattedDate} from "../../utils/formatter/getFormattedDate.ts";
import {voivodeships} from "../forms/utils/voivodeships.ts";
import {countries} from "../forms/utils/countries.ts";
import {status} from "../forms/utils/status.ts";

export type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pesel: string;
  clothSize: string;
  nip: number;
  street1: string;
  house1: string;
  city1: string;
  state1:  { value: string; label: string } | string;
  zip1: string;
  voivodeship1: { value: string; label: string } | string;
  street2: string|undefined;
  house2: string|undefined;
  city2: string|undefined;
  state2:  { value: string; label: string } | string |undefined;
  zip2: string|undefined;
  voivodeship2: { value: string; label: string } | string | undefined;
  status: string;
  jobTitle: string;
  department: string;
  startDate: string;
  endDate: string|null;
  contractType: string;
  workSchedule: string;
  insuranceType: string;
  annualLeaveDays: number;
  baseSalary: number;
  currency: string;
  hourlyRate: number;
  bankAccount: string;
  bankName: string;

};

export const initEmployeeFormData: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pesel: "",
  clothSize: "",
  nip: 0,
  street1: "",
  house1: "",
  city1: "",
  state1: countries[0],
  zip1: "",
  voivodeship1: voivodeships[10],
  street2: undefined,
  house2: undefined,
  city2: undefined,
  state2: undefined,
  zip2: undefined,
  voivodeship2: undefined,
  status: status[0].value,
  jobTitle: "",
  department: "",
  startDate: getFormattedDate(new Date()),
  endDate: null,
  contractType: "",
  workSchedule: "",
  insuranceType: "",
  annualLeaveDays: 0,
  baseSalary: 0,
  currency: "",
  hourlyRate: 0,
  bankAccount: "",
  bankName: "",
};
