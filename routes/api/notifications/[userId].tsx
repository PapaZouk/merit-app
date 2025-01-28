import { PageProps } from "$fresh/server.ts";
import {
  getEventNotificationsByUserId,
} from "../../../components/utils/api-client/notifications/eventNotificationsClient.ts";
import { isValidRequestOrigin } from "../utils/isValidRequestOrigin.ts";
import { formatRouteParam } from "../../../components/utils/formatter/formatRouteParam.ts";

export const handler = async (req: Request, props: PageProps) => {
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
    throw new Error("Missing userId");
  }

  try {
    const eventNotifications = await getEventNotificationsByUserId(userId);
    return new Response(JSON.stringify(eventNotifications), { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch notifications" }),
      { status: 500 },
    );
  }
};
