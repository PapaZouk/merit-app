export interface EventNotification {
    _id: string;
    eventId: string;
    userId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    createdBy: string;
    tags: string[];
    isRead: boolean;
}

export interface EventNotificationCreateRequest {
    eventId: string;
    userId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    createdBy: string;
    tags: string[];
    isRead: boolean;
}

export interface EventNotificationUpdateRequest {
    _id: string;
    eventId: string;
    userId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    createdBy: string;
    tags: string[];
    isRead: boolean;
}