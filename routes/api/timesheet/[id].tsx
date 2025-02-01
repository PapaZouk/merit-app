import { PageProps } from "$fresh/server.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";
import {formatRouteParam} from "../../../components/utils/formatter/formatRouteParam.ts";
import {getTimesheetByEmployeeIdYearAndMonth} from "../../../components/utils/api-client/clients/timesheetClient.ts";
import {validateQueryParams} from "../utils/validateQueryParams.ts";
import {getQueryParam} from "../utils/getQueryParam.ts";

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

    if (!employeeId) {
        throw new Error("Missing employee ID parameter");
    }

    if (validateQueryParams(url, ["year", "month"])) {
        throw new Error("Missing required query parameters");
    }

    const selectedYear = Number.parseInt(getQueryParam(url, "year"), 10);
    const selectedMonth = Number.parseInt(getQueryParam(url, "month"), 10);

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