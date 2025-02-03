import {isValidRequestOrigin} from "../../utils/isValidRequestOrigin.ts";
import {PageProps} from "$fresh/server.ts";
import {
    updateAllEventNotifications
} from "../../../../components/utils/api-client/notifications/eventNotificationsClient.ts";

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
    const queryParams = url.searchParams.get("ids");
    const eventNotificationsIds = queryParams ? queryParams.split(",") : [];

    if (!eventNotificationsIds || eventNotificationsIds.length === 0) {
        throw new Error("Missing event notifications ids");
    }

    try {
        const response = await updateAllEventNotifications(eventNotificationsIds);
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error adding event notification:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add event notification" }),
            { status: 500 },
        );
    }
};