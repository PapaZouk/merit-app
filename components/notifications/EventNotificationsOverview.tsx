import { h } from "preact";
import { useState } from "preact/hooks";
import NotificationCard from "./NotificationCard.tsx";
import { EventNotification } from "../utils/api-client/types/EventNotification.ts";
import { useNotifications } from "../context/NotificationsProvider.tsx";
import { sortNotifications } from "./utils/sortNotifications.ts";
import PaginationNavigation from "../tables/PaginationNavigation.tsx";
import NoNotificationMessage from "./NoNotificationMessage.tsx";

type EventNotificationsOverviewProps = {
  apiConfig: {
    url: string;
    token: string;
  };
};

export default function EventNotificationsOverview(
  { apiConfig }: EventNotificationsOverviewProps,
): h.JSX.Element {
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

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
      <div class="col-span-3">
        {currentNotifications.length > 0
          ? (
            currentNotifications.map((notification: EventNotification) => (
              <NotificationCard
                key={notification.eventId}
                notification={notification}
                apiConfig={apiConfig}
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
