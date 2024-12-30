import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { useState } from "preact/hooks";
import {updateEmployeeById} from "../../../components/utils/api-client/client.ts";
import EmployeeJobDetailsForm from "../../../components/employee/forms/EmployeeJobDetailsForm.tsx";

type EmployeeUpdateJobDetailsProps = {
    employeeData: Employee;
    updateConfig: {
        url: string;
        token: string;
    }
}

export default function EmployeeUpdateJobDetails({employeeData, updateConfig}: EmployeeUpdateJobDetailsProps) {
    const [formData, setFormData] = useState({
        status: employeeData.jobDetails.status,
        jobTitle: employeeData.jobDetails.jobTitle,
        department: employeeData.jobDetails.department,
        startDate: employeeData.jobDetails.startDate,
        endDate: employeeData.jobDetails.endDate,
        contractType: employeeData.jobDetails.contractType,
        workSchedule: employeeData.jobDetails.workSchedule,
        insuranceType: employeeData.jobDetails.insuranceType,
        annualLeaveDays: employeeData.jobDetails.annualLeaveDays
    });

    const handleChange = (e: createElement.JSX.TargetedEvent<HTMLInputElement|HTMLSelectElement, Event>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();

        const updatedData: Employee = {
            _id: employeeData._id,
            personalData: {...employeeData.personalData},
            jobDetails: {
                status: formData.status,
                jobTitle: formData.jobTitle,
                department: formData.department,
                startDate: formData.startDate,
                endDate: formData.endDate,
                contractType: formData.contractType,
                workSchedule: formData.workSchedule,
                insuranceType: formData.insuranceType,
                annualLeaveDays: formData.annualLeaveDays,
                salary: {...employeeData.jobDetails.salary}
            }
        };

        await updateEmployeeById(updatedData._id, updatedData, updateConfig.url, updateConfig.token);

        globalThis.location.href = `/employee/${updatedData._id}`;
    }

    return (
        <EmployeeJobDetailsForm
            employeeData={employeeData}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}