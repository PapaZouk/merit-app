import { createContext, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import {
  EventNotification,
  EventNotificationCreateRequest,
} from "../../components/utils/api-client/types/EventNotification.ts";
import {
  addEventNotification,
  getEventNotificationsByUserId,
  updateEventNotificationByEventId,
} from "../../components/utils/api-client/notifications/eventNotificationsClient.ts";

type NotificationsContextProps = {
  userId: string;
  eventNotifications: EventNotification[];
  addNewEventNotification: (
    notification: EventNotificationCreateRequest,
  ) => void;
  updateEventNotification: (notification: EventNotification) => void;
};

const NotificationsContext = createContext<
  NotificationsContextProps | undefined
>(undefined);

type NotificationsProviderProps = {
  children: h.JSX.Element;
  userId: string | null;
  apiConfig: {
    url: string;
    token: string;
  };
};

export const NotificationsProvider = ({
  children,
  userId,
  apiConfig,
}: NotificationsProviderProps) => {
  const [eventNotifications, setEventNotifications] = useState<
    EventNotification[]
  >([]);

  useEffect(() => {
    if (!userId) return;

    const fetchEventNotifications = async () => {
      try {
        const eventNotifications = await getEventNotificationsByUserId(
          userId,
          apiConfig.url,
          apiConfig.token,
        );
        setEventNotifications(eventNotifications.result);
      } catch (e) {
        console.error(e);
      }
    };

    fetchEventNotifications();
  }, [userId, apiConfig.url, apiConfig.token]);

  const addNewEventNotification = async (
    notification: EventNotificationCreateRequest,
  ) => {
    try {
      const response = await addEventNotification(
        notification,
        apiConfig.url,
        apiConfig.token,
      );

      if (response.status !== 200) {
        throw new Error("Failed to add event notification");
      }

      const { id } = response;
      const newNotification: EventNotification = { ...notification, _id: id };
      setEventNotifications([...eventNotifications, newNotification]);
    } catch (e) {
      console.error("Error adding event notification: ", e);
    }
  };

  const updateEventNotification = async (notification: EventNotification) => {
    try {
      await updateEventNotificationByEventId(
        notification,
        apiConfig.url,
        apiConfig.token,
      );
      setEventNotifications((prev) =>
        prev.map((n) => (n.eventId === notification.eventId ? notification : n))
      );
    } catch (e) {
      console.error("Error updating event notification: ", e);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        userId: userId || "",
        eventNotifications,
        addNewEventNotification,
        updateEventNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider",
    );
  }
  return context;
};
