import { PageProps } from "$fresh/server.ts";
import {getUserByAuthId} from "../../../../components/utils/api-client/users/userClient.ts";
import {formatRouteParam} from "../../../../components/utils/formatter/formatRouteParam.ts";

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

    const userId = formatRouteParam(props);

    if (!userId) {
        throw new Error("Missing userId");
    }

    try {
        const user = await getUserByAuthId(userId);
        const userRoles = user.result.roles || [];

        return new Response(JSON.stringify(userRoles), { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch user roles" }),
            { status: 500 },
        );
    }
}