import {h} from "preact";
import {AuthConfig} from "../../../components/utils/auth/auth-client/getAuthConfig.ts";
import EventNotificationsOverview from "../../../components/notifications/EventNotificationsOverview.tsx";
import {LoginProvider, useLogin} from "../../../components/context/LoginProvider.tsx";
import {NotificationsProvider} from "../../../components/context/NotificationsProvider.tsx";

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
