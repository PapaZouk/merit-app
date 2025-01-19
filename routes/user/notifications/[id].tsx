import { PageProps } from "$fresh/server.ts";
import {
  getEventNotificationsByUserId,
} from "../../../components/utils/api-client/notifications/eventNotificationsClient.ts";
import { getAuthConfig } from "../../../islands/auth/getAuthConfig.ts";
import { getApiConfig } from "../../../components/utils/api-client/config/getApiConfig.ts";
import EventNotifications from "../../../islands/notifications/event/EventNotifications.tsx";

export default async function EventNotificationByUserId(props: PageProps) {
  const authConfig = getAuthConfig();
  const apiConfig = getApiConfig();

  const pathElements = new URL(props.url).pathname.split("/").filter(Boolean);
  const id = pathElements[pathElements.length - 1].trim();
  const notification = await getEventNotificationsByUserId(
    id,
    apiConfig.url,
    apiConfig.token,
  );
  const notificationData = notification.result;

  return (
    <div>
      <EventNotifications
        notifications={notificationData}
        authConfig={authConfig}
        apiConfig={apiConfig}
      />
    </div>
  );
}
