// deno-lint-ignore-file
import { EventNotification } from "../../utils/api-client/types/EventNotification.ts";

export const sortNotifications = (
  notifications: EventNotification[],
): EventNotification[] => {
  return notifications
    .sort((a: EventNotification, b: EventNotification) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .sort((a: EventNotification, b: EventNotification) => a.isRead ? 1 : -1);
};
