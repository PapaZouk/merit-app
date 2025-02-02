import { h } from "preact";
import EventNotificationsOverview from "../../../components/notifications/EventNotificationsOverview.tsx";
import {
  LoginProvider,
  useLogin,
} from "../../../components/context/LoginProvider.tsx";
import { NotificationsProvider } from "../../../components/context/NotificationsProvider.tsx";

export default function EventNotifications(): h.JSX.Element {
  const { userId } = useLogin();
  return (
    <LoginProvider>
      <NotificationsProvider userId={userId}>
        <EventNotificationsOverview />
      </NotificationsProvider>
    </LoginProvider>
  );
}
