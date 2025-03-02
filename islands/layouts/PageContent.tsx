import MainNavigation from "../mainNavigation.tsx";
import { h } from "preact";
import { useState } from "preact/hooks";
import Sidebar from "../sidebar.tsx";
import Login from "../auth/login.tsx";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import Loader from "../../components/loader/loader.tsx";
import { NotificationsProvider } from "../../components/context/NotificationsProvider.tsx";
import OtpAuth from "../auth/OtpAuth.tsx";

type PageContentProps = {
  children: h.JSX.Element;
  toggleSidebar: () => void;
  appName: string;
  isSidebarOpen: boolean;
};

export default function PageContent(
  { children, toggleSidebar, appName, isSidebarOpen }: PageContentProps,
) {
  const { isLoggedIn, isLoading, user, userId } = useLogin();
  const [loginData, setLoginData] = useState({ login: "", password: "" });

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoggedIn()) {
    return (
      <Login
        loginData={loginData}
        setLoginData={setLoginData}
      />
    );
  }

  if (user?.otpEnabled && !user.otpConfirmed) {
    return <OtpAuth />;
  }

  return (
    <NotificationsProvider userId={userId}>
      <div class="flex flex-col h-screen">
        <MainNavigation
          toggleSidebar={toggleSidebar}
          appName={appName}
        />
        <div class="flex flex-1">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <main class="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    </NotificationsProvider>
  );
}
