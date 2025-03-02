import {PageProps} from "$fresh/server.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";
import {formatRouteParam} from "../../../components/utils/formatter/formatRouteParam.ts";
import {getUserByAuthId} from "../../../components/utils/api-client/users/userClient.ts";

export const handler = async (req: Request, props: PageProps) => {;
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    const userId = formatRouteParam(props);

    if (!userId) {
        return new Response(
            JSON.stringify({ error: "Missing user ID parameter" }),
            { status: 400 }
        );
    }

    try {
        const response = await getUserByAuthId(userId);
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch user" }),
            { status: 500 }
        );
    }
}