import {createContext, h} from "preact";
import {useContext, useEffect} from "preact/hooks";
import {Signal, useSignal} from "@preact/signals";
import {EventNotification, EventNotificationCreateRequest,} from "../utils/api-client/types/EventNotification.ts";

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
};

export const NotificationsProvider = ({
  children,
  userId,
}: NotificationsProviderProps) => {
  const eventNotifications: Signal<EventNotification[]> = useSignal<
    EventNotification[]
  >([]);

  useEffect(() => {
    if (!userId) return;

    const fetchEventNotifications = async () => {
      try {
        const response: Response = await fetch(`/api/notifications/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response || !response.ok) {
          console.error("Failed to fetch event notifications");
          return;
        }

        const responseBody = await response.json();
        eventNotifications.value = responseBody.result;
      } catch (e) {
        console.error(e);
      }
    };

    fetchEventNotifications();
  }, [userId]);

  const addNewEventNotification = async (
    notification: EventNotificationCreateRequest,
  ) => {
    try {
      const response = await fetch(`/api/notifications/add/notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });

      if (response.status !== 200) {
        throw new Error("Failed to add event notification");
      }

      const responseBody = await response.json();
      const { id } = responseBody;
      const newNotification: EventNotification = { ...notification, _id: id };
      eventNotifications.value = [...eventNotifications.value, newNotification];
    } catch (e) {
      console.error("Error adding event notification: ", e);
    }
  };

  const updateEventNotification = async (notification: EventNotification) => {
    try {
      await fetch(`/api/notifications/update/notification`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });
      eventNotifications.value = eventNotifications.value.map((n) =>
        n.eventId === notification.eventId ? notification : n
      );
    } catch (e) {
      console.error("Error updating event notification: ", e);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        userId: userId || "",
        eventNotifications: eventNotifications.value,
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
