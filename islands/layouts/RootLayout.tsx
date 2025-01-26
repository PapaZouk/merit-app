import {h} from "preact";
import {useState} from "preact/hooks";
import {LoginProvider,} from "../../components/context/LoginProvider.tsx";
import PageContent from "./PageContent.tsx";

type RootLayoutProps = {
  children: h.JSX.Element;
  apiConfig: {
    url: string;
    token: string;
  };
  appName: string;
};

export default function RootLayout(
  { children, apiConfig, appName }: RootLayoutProps,
) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LoginProvider apiConfig={apiConfig}>
      <PageContent
        toggleSidebar={toggleSidebar}
        apiConfig={apiConfig}
        appName={appName}
        isSidebarOpen={isSidebarOpen}
      >
        {children}
      </PageContent>
    </LoginProvider>
  );
}
