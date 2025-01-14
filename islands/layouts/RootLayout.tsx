import {h} from "preact";
import {useState} from "preact/hooks";
import Sidebar from "../sidebar.tsx";
import MainNavigation from "../mainNavigation.tsx";
import Login from "../auth/login.tsx";
import {useLogin} from "../context/LoginProvider.tsx";
import Loader from "../../components/loader/loader.tsx";
import {AuthConfig} from "../auth/getAuthConfig.ts";

type RootLayoutProps = {
  children: h.JSX.Element;
  authConfig: AuthConfig;
  appName: string;
};

export default function RootLayout({ children, authConfig, appName }: RootLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const { isLoggedIn, isLoading } = useLogin();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div class="flex flex-col h-screen">
      <MainNavigation
        toggleSidebar={toggleSidebar}
        authConfig={authConfig}
        appName={appName}
      />
      <div class="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main class="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
