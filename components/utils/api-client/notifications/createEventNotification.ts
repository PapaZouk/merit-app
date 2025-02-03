import {EventNotificationCreateRequest} from "../types/EventNotification.ts";
import {v4 as uuid} from "npm:uuid";

export default function createEventNotification(
    userId: string|null|undefined,
    title: string,
    description: string,
    location: string,
    tags: string[],
): EventNotificationCreateRequest {
    const date = new Date();
    const eventId = uuid();

    return {
        eventId,
        userId: userId || "",
        title,
        description,
        date: date.toISOString().split("T")[0],
        time: date.toISOString().split("T")[1].split(".")[0],
        location,
        createdBy: userId || "",
        tags,
        isRead: false
    };
}