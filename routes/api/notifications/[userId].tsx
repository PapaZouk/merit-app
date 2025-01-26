import { PageProps } from "$fresh/server.ts";
import {
  getEventNotificationsByUserId,
} from "../../../components/utils/api-client/notifications/eventNotificationsClient.ts";

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
  const userId = pathElements[pathElements.length - 1].split("?")[0];

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
