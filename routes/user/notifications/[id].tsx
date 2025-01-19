import {getAuthConfig} from "../../../islands/auth/getAuthConfig.ts";
import {getApiConfig} from "../../../components/utils/api-client/config/getApiConfig.ts";
import EventNotifications from "../../../islands/notifications/event/EventNotifications.tsx";
import {LoginProvider} from "../../../islands/context/LoginProvider.tsx";

export default async function EventNotificationByUserId() {
  const authConfig = getAuthConfig();
  const apiConfig = getApiConfig();

  return (
    <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
      <EventNotifications
        authConfig={authConfig}
        apiConfig={apiConfig}
      />
    </LoginProvider>
  );
}
