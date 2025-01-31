import {getCachedData, setCachedData} from "../../cache/cacheManager.ts";
import {getApiConfig} from "../config/getApiConfig.ts";
import {AddTimesheetRequest} from "../types/AddTimesheetRequest.ts";

export async function getAllTimesheet(cacheTimeout?: string | undefined) {
    const cacheKey = "allTimesheetCache_01";
    const cachedData = await getCachedData(cacheKey, cacheTimeout ?? "60");

    if (cachedData) {
        return cachedData;
    }

    const { url, token } = getApiConfig();
    const response = await fetch(`${url}/api/auth/timesheet/all/`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch timesheet");
    }

    const data = await response.json();
    setCachedData(cacheKey, data);

    return data;
}

export async function getTimesheetByEmployeeIdYearAndMonth(
    id: string,
    year: number,
    month: number,
    cacheTimeout?: string | undefined,
) {
    const cacheKey = `employeeTimesheetCache_${id}`;
    const cachedData = await getCachedData(cacheKey, cacheTimeout ?? "60");

    if (cachedData) {
        return cachedData;
    }

    const { url, token } = getApiConfig();
    const response = await fetch(
        `${url}/api/auth/timesheet/employee/${id}?year=${year}&month=${month}`,
        {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch timesheet");
    }

    return response.json();
}

export async function updateTimesheetByEmployeeId(id: string, data: any, apiConfig?: { url: string; token: string }) {
    if (!apiConfig) {
        apiConfig = getApiConfig();
    }

    const { url, token } = apiConfig;
    const response = await fetch(`${url}/api/auth/timesheet/employee/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update timesheet");
    }

    return response.json();
}

export async function addTimesheet(timesheet: AddTimesheetRequest) {
    const { url, token } = getApiConfig();
    const response = await fetch(`${url}/api/auth/timesheet`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(timesheet),
    });

    if (!response.ok) {
        throw new Error("Failed to add timesheet");
    }

    return response.json();
}