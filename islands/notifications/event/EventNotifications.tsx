import { h } from "preact";
import { EventNotification } from "../../../components/utils/api-client/types/EventNotification.ts";
import { LoginProvider } from "../../context/LoginProvider.tsx";
import { AuthConfig } from "../../auth/getAuthConfig.ts";
import NotificationCard from "../../../components/notifications/NotificationCard.tsx";

type EventNotificationsProps = {
  notifications: EventNotification[];
  authConfig: AuthConfig;
  apiConfig: {
    url: string;
    token: string;
  };
};

export default function EventNotifications(
  { notifications, authConfig, apiConfig }: EventNotificationsProps,
): h.JSX.Element {
  return (
    <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
        <div class="col-span-3">
          {notifications
            ? notifications.map((notification) => (
              <NotificationCard notification={notification} apiConfig={apiConfig}/>
            ))
            : (
              <div class="bg-white p-4 md:p-4 rounded-lg shadow-lg text-gray-800 w-full">
                <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6 mt-2">
                  <h1 class="flex items center text-xl font-bold mb-2 md:mb-0">
                    Brak powiadomień
                  </h1>
                </div>
              </div>
            )}
        </div>
      </div>
    </LoginProvider>
  );
}
