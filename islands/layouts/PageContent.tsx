import MainNavigation from "../mainNavigation.tsx";
import { h } from "preact";
import {useState} from "preact/hooks";
import Sidebar from "../sidebar.tsx";
import { AuthConfig } from "../../components/utils/auth/auth-client/getAuthConfig.ts";
import Login from "../auth/login.tsx";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import Loader from "../../components/loader/loader.tsx";
import { NotificationsProvider } from "../../components/context/NotificationsProvider.tsx";

type PageContentProps = {
  children: h.JSX.Element;
  toggleSidebar: () => void;
  authConfig: AuthConfig;
  apiConfig: {
    url: string;
    token: string;
  };
  appName: string;
  isSidebarOpen: boolean;
};

export default function PageContent(
  { children, toggleSidebar, authConfig, apiConfig, appName, isSidebarOpen }:
    PageContentProps,
) {
  const { isLoggedIn, isLoading, userId } = useLogin();
  const [loginData, setLoginData] = useState({ login: "", password: "" });

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoggedIn()) {
    return (
      <Login
        loginData={loginData}
        setLoginData={setLoginData}
        authConfig={authConfig}
      />
    );
  }

  return (
    <NotificationsProvider userId={userId} apiConfig={apiConfig}>
      <div class="flex flex-col h-screen">
        <MainNavigation
          toggleSidebar={toggleSidebar}
          authConfig={authConfig}
          apiConfig={apiConfig}
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
