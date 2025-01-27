import {EventNotification} from "../../utils/api-client/types/EventNotification.ts";

export const sortNotifications = (notifications: EventNotification[]): EventNotification[] => {
    return notifications
        .sort(
            (a: EventNotification, b: EventNotification) =>
                new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        // deno-lint-ignore no-unused-vars
        .sort((a: EventNotification, b: EventNotification) => a.isRead ? 1 : -1);
}