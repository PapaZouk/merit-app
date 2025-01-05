import {Bell, CircleUserRound, Mail,} from "https://esm.sh/lucide-preact@latest";
import {useEffect, useRef, useState} from "preact/hooks";
import {useLogin} from "./context/LoginProvider.tsx";
import {getAuthClient} from "../components/utils/auth/auth-client/authClient.ts";
import {AuthConfig} from "./auth/getAuthConfig.ts";
import {UserRoleEnum} from "../components/utils/auth/types/userRoles.ts";

type MainNavigationProps = {
  toggleSidebar: () => void;
  authConfig: AuthConfig;
};

export default function MainNavigation({ toggleSidebar, authConfig }: MainNavigationProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, setUserRole } = useLogin();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  const onLogout = async (): Promise<void> => {
    try {
      await getAuthClient({ config: authConfig }).deleteSessions();
      console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout failed', error);
    }

    setUserRole([UserRoleEnum.GUEST]);
    globalThis.location.href = '/';
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div class="flex items-center">
        <a href="/">
          <img
            src="/images/logo_256x256.png"
            alt="Logo"
            class="w-8 h-8 mx-auto md:mx-0 md:ml-4"
          />
        </a>
        <span
          class="ml-2 text-xl font-semibold text-gray-800"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          MERIT
        </span>
      </div>
      <div class="relative flex items-center ml-auto">
        <Bell size={24} class="mr-4 text-gray-600 hover:text-gray-900" />
        <Mail size={24} class="mr-4 text-gray-600 hover:text-gray-900" />
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
