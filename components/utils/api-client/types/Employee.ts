export interface Employee {
    _id: string;
    personalData: PersonalData;
    jobDetails: JobDetails;
}

export interface PersonalData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    pesel: string;
    clothSize: string;
    nip: number|null|undefined;
    personalDataHistory: PersonalDataHistory[];
    address1: Address1;
    address2: Address2;
}

export interface PersonalDataHistory {
    firstNameBefore: string;
    firstNameAfter: string;
    lastNameBefore: string;
    lastNameAfter: string;
    emailBefore: string;
    emailAfter: string;
    phoneBefore: string;
    phoneAfter: string;
    peselBefore: string;
    peselAfter: string;
    clothSizeBefore: string;
    clothSizeAfter: string;
    nipBefore: number | null | undefined;
    nipAfter: number | null | undefined;
    changeDate: string;
}

export interface Address1 {
    street1: string;
    house1: string;
    city1: string;
    zip1: string;
    state1: string;
    voivodeship1: string;
    address1History: Address1History[];
}

export interface Address1History {
    street1Before: string;
    street1After: string;
    house1Before: string;
    house1After: string;
    city1Before: string;
    city1After: string;
    state1Before: string;
    state1After: string;
    zip1Before: string;
    zip1After: string;
    voivodeship1Before: string;
    voivodeship1After: string;
    changeDate: string;
}

export interface Address2 {
    street2: string|null|undefined;
    house2: string|null|undefined;
    city2: string|null|undefined;
    zip2: string|null|undefined;
    state2: string|null|undefined;
    voivodeship2: string|null|undefined;
    address2History: Address2History[];
}

export interface Address2History {
    street2Before: string|null|undefined;
    street2After: string|null|undefined;
    house2Before: string|null|undefined;
    house2After: string|null|undefined;
    city2Before: string|null|undefined;
    city2After: string|null|undefined;
    state2Before: string|null|undefined;
    state2After: string|null|undefined;
    zip2Before: string|null|undefined;
    zip2After: string|null|undefined;
    voivodeship2Before: string|null|undefined;
    voivodeship2After: string|null|undefined;
    changeDate: string|null|undefined;
}

export interface JobDetails {
    status: string;
    jobTitle: string;
    department: string;
    startDate: string;
    endDate: string|null;
    contractType: string;
    workSchedule: string;
    insuranceType: string;
    annualLeaveDays: number;
    jobDetailsHistory: JobDetailsHistory[];
    jobStayAddress?: JobStayAddress;
    salary: Salary;
}

export interface JobStayAddress {
    street: string;
    house: string;
    city: string;
    zip: string;
    state: string;
    voivodeship: string;
    jobStayAddressHistory?: JobStayAddressHistory[];
}

export interface JobStayAddressHistory {
    streetBefore?: string|null|undefined;
    streetAfter?: string|null|undefined;
    houseBefore?: string|null|undefined;
    houseAfter?: string|null|undefined;
    cityBefore?: string|null|undefined;
    cityAfter?: string|null|undefined;
    stateBefore?: string|null|undefined;
    stateAfter?: string|null|undefined;
    zipBefore?: string|null|undefined;
    zipAfter?: string|null|undefined;
    voivodeshipBefore?: string|null|undefined;
    voivodeshipAfter?: string|null|undefined;
    changeDate?: string|null|undefined;
}

export interface JobDetailsHistory {
    statusBefore: string;
    statusAfter: string;
    jobTitleBefore: string;
    jobTitleAfter: string;
    departmentBefore: string;
    departmentAfter: string;
    startDateBefore: string;
    startDateAfter: string;
    endDateBefore: string|null;
    endDateAfter: string|null;
    contractTypeBefore: string;
    contractTypeAfter: string;
    workScheduleBefore: string;
    workScheduleAfter: string;
    insuranceTypeBefore: string;
    insuranceTypeAfter: string;
    annualLeaveDaysBefore: number;
    annualLeaveDaysAfter: number;
    changeDate: string;
}

export interface Salary {
    baseSalary: number;
    currency: string;
    hourlyRate: number;
    bankAccount: string;
    bankName: string;
    salaryHistory: SalaryHistory[];
}

export interface SalaryHistory {
    salaryBefore: number;
    salaryAfter: number;
    hourlyRateBefore: number;
    hourlyRateAfter: number;
    currencyBefore: string;
    currencyAfter: string;
    bankAccountBefore: string;
    bankAccountAfter: string;
    bankNameBefore: string;
    bankNameAfter: string;
    changeDate: string;
}