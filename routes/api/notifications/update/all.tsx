import {isValidRequestOrigin} from "../../utils/isValidRequestOrigin.ts";
import {
    updateAllEventNotifications
} from "../../../../components/utils/api-client/notifications/eventNotificationsClient.ts";

export const handler = async (req: Request) => {
    if (!isValidRequestOrigin(req)) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/",
            },
        });
    }

    let bodyData = null;

    if (req.method === "POST" || req.method === "PUT") {
        bodyData = await req.json();
    }

    if (!bodyData) {
        throw new Error("Missing body data");
    }

    try {
        const response = await updateAllEventNotifications(bodyData);
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error adding event notification:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add event notification" }),
            { status: 500 },
        );
    }
};