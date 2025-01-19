import {getCachedData, setCachedData} from "../../cache/cacheManager.ts";
import {getApiConfig} from "../config/getApiConfig.ts";

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