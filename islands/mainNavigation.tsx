import {Bell, CircleUserRound, Mail,} from "https://esm.sh/lucide-preact@latest";
import {useEffect, useRef, useState} from "preact/hooks";
import {getAuthClient} from "../components/utils/auth/auth-client/authClient.ts";
import {UserRoleEnum} from "../components/utils/auth/types/userRoles.ts";
import {EventNotification} from "../components/utils/api-client/types/EventNotification.ts";
import {useNotifications} from "../components/context/NotificationsProvider.tsx";
import {useLogin} from "../components/context/LoginProvider.tsx";
import {sortNotifications} from "../components/notifications/utils/sortNotifications.ts";

type MainNavigationProps = {
  toggleSidebar: () => void;
  appName: string;
};

export default function MainNavigation(
  { toggleSidebar, appName }: MainNavigationProps,
) {
  const { eventNotifications, updateEventNotification } = useNotifications();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const { userId, setUserRole } = useLogin();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
    if (
      notificationMenuRef.current &&
      !notificationMenuRef.current.contains(event.target as Node)
    ) {
      setIsNotificationOpen(false);
    }
  };

  const onLogout = async (): Promise<void> => {
    try {
      await getAuthClient().deleteSessions();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }

    setUserRole([UserRoleEnum.GUEST]);
    globalThis.location.href = "/";
  };

  const markNotificationAsRead = (notification: EventNotification) => {
    const notificationUpdateRequest: EventNotification = {
      ...notification,
      isRead: true,
    };
    updateEventNotification(notificationUpdateRequest);
  };

  const handleNotificationClick = (notification: EventNotification) => {
    if (!notification.isRead) {
      markNotificationAsRead(notification);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const sortedNotifications = sortNotifications(eventNotifications);
  const unreadNotificationsLength = sortedNotifications.filter((n: EventNotification) => !n.isRead).length;

  return (
    <nav class="w-full bg-white text-gray-800 p-4 flex justify-between items-center shadow-md">
      <button class="md:hidden" onClick={toggleSidebar}>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          >
          </path>
        </svg>
      </button>
      <div class="flex items-center ml-auto md:ml-4 lg:ml-4">
        <a href="/">
          <img
            src="/images/logo_256x256.png"
            alt="Logo"
            class="w-8 h-8 mx-auto md:mx-0 md:ml-4"
          />
        </a>
        <span
          class="ml-2 text-xl font-semibold text-gray-800 hidden md:block lg:block"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {appName}
        </span>
      </div>
      <div class="relative flex items-center ml-auto space-x-4">
        <button
          onClick={toggleNotificationMenu}
          class="relative flex items center"
        >
          <Bell size={24} class="text-gray-600 hover:text-gray-900" />
          {sortedNotifications.filter((n) => !n.isRead).length > 0 && (
            <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs
             font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2
             w-5 h-5 md:w-auto md:h-auto">
              {unreadNotificationsLength > 99 ? "+99" : unreadNotificationsLength}
            </span>
          )}
        </button>
        {isNotificationOpen && (
          <div
            ref={notificationMenuRef}
            className="absolute top-full right-0 mt-2 w-72 md:w-96 bg-white text-gray-800 rounded-md shadow-lg"
          >
            <ul>
              {sortedNotifications.slice(0, 5).map((notification) => (
                <li
                  key={notification.eventId}
                  class={`px-4 py-2 ${
                    notification.isRead
                      ? "bg-gray-200"
                      : "hover:bg-blue-100 cursor-pointer"
                  }`}
                  onClick={() =>
                    !notification.isRead &&
                    handleNotificationClick(notification)}
                >
                  <div>
                    <h1 class="font-semibold">{notification.title}</h1>
                    <p class="text-sm text-gray-600">
                      {notification.description}
                    </p>
                  </div>
                </li>
              ))}
              {sortedNotifications.length > 0 && (
                <li
                  class="px-4 py-2 text-center text-sm text-blue-500 hover:bg-blue-100 cursor-pointer font-semibold"
                  onClick={() =>
                    globalThis.location.href = `/user/notifications/${userId}`}
                >
                  Zobacz wszystkie
                </li>
              )}
            </ul>
          </div>
        )}
        <Mail size={24} class="text-gray-600 hover:text-gray-900" />
        <button onClick={toggleProfileMenu} class="flex items-center">
          <CircleUserRound
            size={32}
            class="text-gray-600 hover:text-gray-900"
          />
        </button>
        {isProfileOpen && (
          <div
            ref={profileMenuRef}
            class="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg"
          >
            <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">
              Profil
            </a>
            <a href="/settings" class="block px-4 py-2 hover:bg-gray-100">
              Ustawienia
            </a>
            <button
              onClick={onLogout}
              class="block px-4 py-2 hover:bg-gray-100"
            >
              Wyloguj
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
