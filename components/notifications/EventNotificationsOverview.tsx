import { h } from "preact";
import { useState } from "preact/hooks";
import NotificationCard from "./NotificationCard.tsx";
import { EventNotification } from "../utils/api-client/types/EventNotification.ts";
import { useNotifications } from "../context/NotificationsProvider.tsx";
import { sortNotifications } from "./utils/sortNotifications.ts";
import PaginationNavigation from "../tables/PaginationNavigation.tsx";
import NoNotificationMessage from "./NoNotificationMessage.tsx";
import FormInput from "../forms/FormInput.tsx";
import FormLabel from "../forms/FormLabel.tsx";

export default function EventNotificationsOverview(): h.JSX.Element {
  const { eventNotifications } = useNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 4;

  const sortedEventNotifications = sortNotifications(eventNotifications);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification -
    notificationsPerPage;
  const currentNotifications = sortedEventNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification,
  );

  const totalPages = Math.ceil(
    sortedEventNotifications.length / notificationsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotificationsIds: string[] = eventNotifications.filter((
      notification: EventNotification,
    ) => !notification.isRead)
      .map((notification: EventNotification) => {
        return notification._id;
      });

    if (unreadNotificationsIds.length === 0) {
      throw new Error("No unread notifications to mark as read");
    }

    await fetch(
      `/api/notifications/update/all?ids=${unreadNotificationsIds.join(",")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventNotifications),
      },
    );

    globalThis.location.reload();
  };

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
      <div class="flex flex-col col-span-3 mt-6 mb-2 p-4 sm:flex-row items-center justify-between">
        <h1 class="text-gray-800 text-xl font-bold mb-2 sm:mb-0">
          Powiadomienia
        </h1>
        <div class="flex items-center justify-end w-full sm:w-auto sm:ml-auto">
          <FormLabel
            htmlFor={"markAllAsRead"}
            text={"Oznacz wszystkie jako przeczytane"}
            className="mr-2"
          />
          <FormInput
            type={"checkbox"}
            name={"markAllAsRead"}
            handleChange={handleMarkAllAsRead}
            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
          />
        </div>
      </div>
      <div class="col-span-3">
        {currentNotifications.length > 0
          ? (
            currentNotifications.map((notification: EventNotification) => (
              <NotificationCard
                key={notification.eventId}
                notification={notification}
              />
            ))
          )
          : <NoNotificationMessage />}
        <PaginationNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
}
