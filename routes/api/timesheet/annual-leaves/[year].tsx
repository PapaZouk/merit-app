import { PageProps } from "$fresh/server.ts";
import {isValidRequestOrigin} from "../../utils/isValidRequestOrigin.ts";
import {formatRouteParam} from "../../../../components/utils/formatter/formatRouteParam.ts";
import {getAnnualLeavesByYear} from "../../../../components/utils/api-client/timesheet/annualLeaves.ts";

export const handler = async (req: Request, props: PageProps) => {
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const year = formatRouteParam(props);

    if (!year) {
        throw new Error("Missing year");
    }

    try {
        const response = await getAnnualLeavesByYear(year);
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching annual leaves:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch annual leaves" }),
            { status: 500 },
        );
    }
}