import { PageProps } from "$fresh/server.ts";
import {getEmployeeById} from "../../../components/utils/api-client/clients/employeeClient.ts";

export const handler = async (req: Request, props: PageProps) => {
    const origin = req.headers.get("origin") || req.headers.get("referer");
    const allowedOrigin = Deno.env.get("BASE_URL") || "";

    if (!origin || !origin.startsWith(allowedOrigin)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const url = new URL(props.url);
    const pathElements = url.pathname.split("/").filter(Boolean);
    const employeeId = pathElements[pathElements.length - 1].split("?")[0];

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