import {EventNotification} from "../../utils/api-client/types/EventNotification.ts";

export const getNotificationReadUpdateRequest = (notification: EventNotification) => {
    return {
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
}