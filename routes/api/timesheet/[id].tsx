import { PageProps } from "$fresh/server.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";
import {formatRouteParam} from "../../../components/utils/formatter/formatRouteParam.ts";
import {getTimesheetByEmployeeIdYearAndMonth} from "../../../components/utils/api-client/clients/timesheetClient.ts";

export const handler = async (req: Request, props: PageProps) => {
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const url = new URL(props.url);
    const employeeId = formatRouteParam(props);
    const selectedYear = parseInt(
        url.searchParams.get("year") || new Date().getFullYear().toString(),
        10,
    );
    const selectedMonth = parseInt(
        url.searchParams.get("month") || "1",
        new Date().getMonth(),
    );

    if (!employeeId || !selectedYear || !selectedMonth) {
        throw new Error("Missing required parameters");
    }

    try {
        const timesheet = await getTimesheetByEmployeeIdYearAndMonth(
            employeeId,
            selectedYear,
            selectedMonth,
        );
        return new Response(JSON.stringify(timesheet), { status: 200 });
    } catch (error) {
        console.error("Error fetching timesheet:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch timesheet" }),
            { status: 500 },
        );
    }
}