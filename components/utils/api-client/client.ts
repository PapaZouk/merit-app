import {getCachedData, setCachedData} from "../cache/cacheManager.ts";
import {getConfig} from "./config/getConfig.ts";
import {Employee} from "./types/Employee.ts";

export async function getEmployees(cacheTimeout?: string|undefined) {
    const cacheKey = "employeesCache_01";
    const cachedData = await getCachedData(cacheKey, cacheTimeout ?? '60');

    if (cachedData) {
        return cachedData;
    }

    const { url, token } = getConfig();
    const response = await fetch(`${url}/api/auth/employee/all`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    const data = await response.json();
    setCachedData<Employee>(cacheKey, data);

    return data;
}

export async function getEmployeeById(id: string) {
    const cacheKey = `employeeCache_${id}`;
    const cachedData = await getCachedData(cacheKey, '60');

    if (cachedData) {
        return cachedData;
    }

    const { url, token } = getConfig();
    const response = await fetch(`${url}/api/auth/employee/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch employee");
    }

    return response.json();
}

export async function updateEmployeeById(
    id: string,
    employeeData: Employee,
    url: string,
    token: string
) {
    console.log('Requesting update employee with ID: ', id);
    const response = await fetch(`${url}/api/auth/employee/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
        throw new Error("Failed to update employee");
    }

    return response.json();
}