import {h} from "preact";
import {LoginProvider, useLogin} from "../../context/LoginProvider.tsx";
import {AuthConfig} from "../../auth/getAuthConfig.ts";
import {NotificationsProvider} from "../../context/NotificationsProvider.tsx";
import EventNotificationsOverview from "../../../components/notifications/EventNotificationsOverview.tsx";

type EventNotificationsProps = {
  authConfig: AuthConfig;
  apiConfig: {
    url: string;
    token: string;
  };
};

export default function EventNotifications(
  { authConfig, apiConfig }: EventNotificationsProps,
): h.JSX.Element {
  const {userId} = useLogin();
  return (
    <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
      <NotificationsProvider userId={userId} apiConfig={apiConfig}>
        <EventNotificationsOverview apiConfig={apiConfig} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
