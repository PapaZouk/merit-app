import {
  EventNotification,
  EventNotificationCreateRequest,
} from "../types/EventNotification.ts";
import { getApiConfig } from "../config/getApiConfig.ts";

export async function getEventNotificationsByUserId(userId: string) {
  const { url, token } = getApiConfig();

  if (!url || !token) {
    throw new Error("API configuration is missing");
  }

  const requestUrl = `${url}/api/auth/notification/event/${userId}`;

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

  if (response.status === 404) {
    console.log('Found 0 event notification: ', response);
    return [];
  }

  if (response.status === 500) {
    console.log('Failed to fetch event notifications: ', response);
    throw new Error("Failed to fetch event notifications");
  }

  return response.json();
}

export async function addEventNotification(
  notification: EventNotificationCreateRequest,
) {
  const { url, token } = getApiConfig();

  if (!url || !token) {
    throw new Error("API configuration is missing");
  }

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
) {
  const { url, token } = getApiConfig();
  const response = await fetch(
    `${url}/api/auth/notification/event/update/${notification.eventId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(notification),
    },
  );

  if (response.status !== 200) {
    throw new Error("Failed to update event notification");
  }

  return response.json();
}

export async function updateAllEventNotifications(
  ids: string[],
) {
  const { url, token } = getApiConfig();

  const formatedUrl = `${url}/api/auth/notification/event/read/all?ids=${
    ids.join(",")
  }`;

  const response = await fetch(
    formatedUrl,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update event notifications");
  }

  return response.json();
}
