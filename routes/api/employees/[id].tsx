import { PageProps } from "$fresh/server.ts";
import {getEmployeeById} from "../../../components/utils/api-client/clients/employeeClient.ts";
import {formatRouteParam} from "../../../components/utils/formatter/formatRouteParam.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";

export const handler = async (req: Request, props: PageProps) => {
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const employeeId = formatRouteParam(props);

    if (!employeeId) {
        throw new Error("Missing employeeId");
    }

    try {
        const employee = await getEmployeeById(employeeId);
        return new Response(JSON.stringify(employee), { status: 200 });
    } catch (error) {
        console.error("Error fetching employee:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch employee" }),
            { status: 500 },
        );
    }
}