import {getAllTimesheet} from "../../../components/utils/api-client/clients/timesheetClient.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";

export const handler = async (req: Request) => {
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const cacheTimeout = Deno.env.get("CACHE_EXPIRATION") || "60";

    try {
        const timesheet = await getAllTimesheet(cacheTimeout);
        return new Response(JSON.stringify(timesheet), { status: 200 });
    } catch (error) {
        console.error("Error fetching timesheet", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch timesheet" }),
            { status: 500 },
        );
    }
};