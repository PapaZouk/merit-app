import {getApiConfig} from "../../../components/utils/api-client/config/getApiConfig.ts";
import EventNotifications from "../../../islands/notifications/event/EventNotifications.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default async function EventNotificationByUserId() {
  const apiConfig = getApiConfig();

  return (
    <LoginProvider>
      <EventNotifications apiConfig={apiConfig}/>
    </LoginProvider>
  );
}
