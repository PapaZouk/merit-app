import EventNotifications from "../../../islands/notifications/event/EventNotifications.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default function EventNotificationByUserId() {
  return (
    <LoginProvider>
      <EventNotifications />
    </LoginProvider>
  );
}
