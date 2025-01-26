import {getAuthConfig} from "../../../components/utils/auth/auth-client/getAuthConfig.ts";
import {getApiConfig} from "../../../components/utils/api-client/config/getApiConfig.ts";
import EventNotifications from "../../../islands/notifications/event/EventNotifications.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

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
