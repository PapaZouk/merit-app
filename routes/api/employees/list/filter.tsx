import { PageProps } from "$fresh/server.ts";
import {getAllEmployeesWithIds} from "../../../../components/utils/api-client/clients/employeeClient.ts";
import {isValidRequestOrigin} from "../../utils/isValidRequestOrigin.ts";

export const handler = async (req: Request, props: PageProps) => {
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const cacheTimeout = Deno.env.get("CACHE_EXPIRATION") || "60";

    const url = new URL(props.url);
    const queryParams = url.searchParams.get("ids");
    const employeeIds = queryParams?.split(",") || [];

    if (employeeIds.length === 0) {
        throw new Error("Missing employees ID");
    }

    try {
        const employees = await getAllEmployeesWithIds(employeeIds, cacheTimeout);
        return new Response(JSON.stringify(employees), { status: 200 });
    } catch (error) {
        console.error("Error fetching employees by IDs:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch employees by IDs"}),
            { status: 500 },
        );
    }
}