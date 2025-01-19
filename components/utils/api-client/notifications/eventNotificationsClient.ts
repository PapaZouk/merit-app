import {EventNotification, EventNotificationCreateRequest} from "../types/EventNotification.ts";

export async function getEventNotificationsByUserId(
  userId: string,
  url: string,
  token: string,
) {
  console.log(`Fetching event notifications for user ${userId}`);
  const requestUrl = `${url}/api/auth/notification/event/${userId}`;
  console.log(`Request URL: ${requestUrl}`);

  if (!userId) {
    return;
  }

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch event notifications");
  }

  return response.json();
}

export async function addEventNotification(
    notification: EventNotificationCreateRequest,
    url: string,
    token: string,
) {
  const response = await fetch(`${url}/api/auth/notification/event/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(notification),
    });

  if (response.status !== 200) {
    throw new Error("Failed to add event notification");
  }

  return response.json();
}

export async function updateEventNotificationByEventId(
    notification: EventNotification,
    url: string,
    token: string,
) {
  const response = await fetch(`${url}/api/auth/notification/event/update/${notification.eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(notification),
    });

  if (response.status !== 200) {
    throw new Error("Failed to update event notification");
  }

  return response.json();
}