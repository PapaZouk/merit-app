import { EventNotification } from "../utils/api-client/types/EventNotification.ts";
import { useEffect, useState } from "preact/hooks";
import { getNotificationReadUpdateRequest } from "./utils/getNotificationReadUpdateRequest.ts";
import { getNotificationHeaderBgColor } from "./utils/getNotificationHeaderBgColor.ts";
import FormInput from "../common/forms/FormInput.tsx";
import { Employee } from "../utils/api-client/types/Employee.ts";

type NotificationCardProps = {
  notification: EventNotification;
};

export default function NotificationCard(
  { notification }: NotificationCardProps,
) {
  const [isChecked, setIsChecked] = useState<boolean>(notification.isRead);
  const [notificationAuthors, setNotificationAuthors] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function fetchAuthors() {
      const response = await fetch(`/api/employees/${notification._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch authors");
        return;
      }

      const author: Employee = (await response.json()).result;
      setNotificationAuthors(
        `${author.personalData.firstName} ${author.personalData.lastName}`,
      );
    }

    if (notification) {
      fetchAuthors();
    }
  }, []);

  const headerBgColor = getNotificationHeaderBgColor(notification);
  const notificationUpdateRequest = getNotificationReadUpdateRequest(
    notification,
  );
  const bgColor = `${notification.isRead ? "bg-gray-200" : "bg-white"}`;

  const handleCheckboxChange = async (): Promise<void> => {
    try {
      const response = await fetch(
        "/api/notifications/update/notification",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationUpdateRequest),
        },
      );

      if (response.status === 200) {
        setIsChecked(true);
        globalThis.location.reload();
      } else {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div class={`p-4 shadow-lg rounded-lg mb-2 ${bgColor}`}>
      <div
        class={`flex items-center justify-between mb-2 p-2 rounded ${headerBgColor}`}
      >
        <h1 class="text-lg font-bold text-white">
          {notification.title} {isChecked ? "(Przeczytane)" : ""}
        </h1>
        <FormInput
          type={"checkbox"}
          name={"notification"}
          value={notification.title}
          checked={isChecked}
          disabled={isChecked}
          handleChange={handleCheckboxChange}
        />
      </div>
      <p class={`text-gray-700 mb-1 text-sm ${bgColor}`}>
        {notification.description}
      </p>
      <p class="text-gray-500 text-xs">
        {notification.date} {notification.time}
        {notificationAuthors ? ` - ${notificationAuthors}` : ""}
      </p>
    </div>
  );
}
