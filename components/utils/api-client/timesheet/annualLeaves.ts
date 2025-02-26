import {getCachedData, setCachedData} from "../../cache/cacheManager.ts";
import {getApiConfig} from "../config/getApiConfig.ts";

export async function getAnnualLeavesByYear(year: string, cacheTimeout?: string | undefined) {
    const cacheKey = `annualLeavesCache`;
    const cachedData = await getCachedData(cacheKey, cacheTimeout ?? "60");

    if (cachedData) {
        return cachedData;
    }

    const { url, token } = getApiConfig();
    const response = await fetch(`${url}/api/auth/timesheet/annual-leaves/${year}`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    });

    if (response.status === 404) {
        console.log("Found 0 annual leaves", response);
        return [];
    }

    if (response.status === 500) {
        throw new Error("Failed to fetch annual leaves");
    }

    const data = await response.json();

    setCachedData(cacheKey, data);

    return data;
}