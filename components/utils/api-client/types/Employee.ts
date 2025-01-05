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
    address1: Address1;
    address2: Address2;
}

export interface Address1 {
    street1: string;
    house1: string;
    city1: string;
    zip1: string;
    state1: string;
    voivodeship1: string;
}

export interface Address2 {
    street2: string|null|undefined;
    house2: string|null|undefined;
    city2: string|null|undefined;
    zip2: string|null|undefined;
    state2: string|null|undefined;
    voivodeship2: string|null|undefined;
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
    salary: Salary;
}

export interface Salary {
    baseSalary: number;
    currency: string;
    bankAccount: string;
    bankName: string;
}