import { EventNotification } from "../utils/api-client/types/EventNotification.ts";

type NotificationCardProps = {
  notification: EventNotification;
  apiConfig: {
    url: string;
    token: string;
  };
};

const tagColors: { [key: string]: string } = {
  finance: "bg-red-500",
  hr: "bg-blue-500",
  employee: "bg-yellow-500",
  default: "bg-gray-800",
};

export default function NotificationCard(
  { notification, apiConfig }: NotificationCardProps,
) {
  const headerBgColor = notification.tags.length > 0
    ? notification.isRead
      ? tagColors.default
      : tagColors[notification.tags[0]] || tagColors.default
    : tagColors.default;

  const notificationUpdateRequest = {
    _id: notification._id,
    userId: notification.userId,
    eventId: notification.eventId,
    title: notification.title,
    description: notification.description,
    date: notification.date,
    time: notification.time,
    location: notification.location,
    createdBy: notification.createdBy,
    tags: notification.tags,
    isRead: true,
  };

  const handleCheckboxChange = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${apiConfig.url}/api/auth/notification/event/update/${notification.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${apiConfig.token}`,
          },
          body: JSON.stringify(notificationUpdateRequest),
        },
      );

      if (response.status === 200) {
        console.log("Notification marked as read");
        globalThis.location.reload();
      } else {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const bgColor = `${notification.isRead ? "bg-gray-200" : "bg-white"}`;

  return (
    <div class={`p-4 shadow-lg rounded-lg mb-2 ${bgColor}`}>
      <div
        class={`flex items-center justify-between mb-2 p-2 rounded ${headerBgColor}`}
      >
        <h1 class="text-lg font-bold text-white">
          {notification.title} {notification.isRead ? "(Przeczytane)" : ""}
        </h1>
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-blue-600"
          disabled={notification.isRead}
          onChange={handleCheckboxChange}
        />
      </div>
      <p class={`text-gray-700 mb-1 text-sm ${bgColor}`}>
        {notification.description}
      </p>
      <p class="text-gray-500 text-xs">
        {notification.date} {notification.time}
      </p>
      <div class="mt-2 flex flex-wrap gap-1">
        {notification.tags.map((tag) => (
          <span class="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
