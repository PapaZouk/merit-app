import {h} from "preact";
import {useState} from "preact/hooks";
import {LoginProvider,} from "../../components/context/LoginProvider.tsx";
import {AuthConfig} from "../../components/utils/auth/auth-client/getAuthConfig.ts";
import PageContent from "./PageContent.tsx";

type RootLayoutProps = {
  children: h.JSX.Element;
  authConfig: AuthConfig;
  apiConfig: {
    url: string;
    token: string;
  };
  appName: string;
};

export default function RootLayout(
  { children, authConfig, apiConfig, appName }: RootLayoutProps,
) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LoginProvider authConfig={authConfig} apiConfig={apiConfig}>
      <PageContent
        toggleSidebar={toggleSidebar}
        authConfig={authConfig}
        apiConfig={apiConfig}
        appName={appName}
        isSidebarOpen={isSidebarOpen}
      >
        {children}
      </PageContent>
    </LoginProvider>
  );
}
