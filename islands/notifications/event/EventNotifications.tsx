import {h} from "preact";
import EventNotificationsOverview from "../../../components/notifications/EventNotificationsOverview.tsx";
import {LoginProvider, useLogin} from "../../../components/context/LoginProvider.tsx";
import {NotificationsProvider} from "../../../components/context/NotificationsProvider.tsx";

type EventNotificationsProps = {
  apiConfig: {
    url: string;
    token: string;
  };
};

export default function EventNotifications(
  { apiConfig }: EventNotificationsProps,
): h.JSX.Element {
  const {userId} = useLogin();
  return (
    <LoginProvider>
      <NotificationsProvider userId={userId}>
        <EventNotificationsOverview apiConfig={apiConfig} />
      </NotificationsProvider>
    </LoginProvider>
  );
}
