import { EventNotification } from "../../utils/api-client/types/EventNotification.ts";

const tagColors: { [key: string]: string } = {
  finance: "bg-red-500",
  hr: "bg-blue-500",
  employee: "bg-yellow-500",
  default: "bg-gray-800",
};

export const getNotificationHeaderBgColor = (
  notification: EventNotification,
) => {
  return notification.tags.length > 0
    ? notification.isRead
      ? tagColors.default
      : tagColors[notification.tags[0]] || tagColors.default
    : tagColors.default;
};
