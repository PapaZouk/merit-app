import EmployeePersonalDataForm from "../../../components/employee/forms/EmployeePersonalDataForm.tsx";
import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import {updateEmployeeById} from "../../../components/utils/api-client/client.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { useState } from "preact/hooks";

type EmployeeUpdateProps = {
    employeeData: Employee;
    updateConfig: {
        url: string;
        token: string;
    }
}

export default function EmployeeUpdatePersonalData({employeeData, updateConfig}: EmployeeUpdateProps) {
    const [formData, setFormData] = useState({
        firstName: employeeData.personalData.firstName,
        lastName: employeeData.personalData.lastName,
        email: employeeData.personalData.email,
        phone: employeeData.personalData.phone,
        pesel: employeeData.personalData.pesel,
        clothSize: employeeData.personalData.clothSize,
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
            personalData: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                pesel: formData.pesel,
                clothSize: formData.clothSize,
                address1: employeeData.personalData.address1,
                address2: employeeData.personalData.address2,
            },
            jobDetails: {...employeeData.jobDetails},
        };

        await updateEmployeeById(updatedData._id, updatedData, updateConfig.url, updateConfig.token);

        globalThis.location.href = `/hr/employee/${updatedData._id}`;
    };

    return (
        <EmployeePersonalDataForm
            employeeData={employeeData}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}