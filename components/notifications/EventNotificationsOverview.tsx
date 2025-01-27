import { h } from "preact";
import { useState } from "preact/hooks";
import NotificationCard from "./NotificationCard.tsx";
import { EventNotification } from "../utils/api-client/types/EventNotification.ts";
import {useNotifications} from "../context/NotificationsProvider.tsx";
import {sortNotifications} from "./utils/sortNotifications.ts";

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
          : (
            <div class="bg-white p-4 md:p-4 rounded-lg shadow-lg text-gray-800 w-full">
              <div class="col-span-4 flex items-end justify-start mb-4 md:mb-6 mt-2">
                <h1 class="flex items center text-xl font-bold mb-2 md:mb-0">
                  Brak powiadomień
                </h1>
              </div>
            </div>
          )}
        <div class="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Poprzednie
          </button>
          <span class="px-4 py-2">
            Strona {currentPage} z {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Następne
          </button>
        </div>
      </div>
    </div>
  );
}
