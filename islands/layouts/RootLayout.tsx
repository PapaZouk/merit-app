import {h} from "preact";
import {useState} from "preact/hooks";
import {LoginProvider,} from "../../components/context/LoginProvider.tsx";
import PageContent from "./PageContent.tsx";

type RootLayoutProps = {
  children: h.JSX.Element;
  appName: string;
};

export default function RootLayout(
  { children, appName }: RootLayoutProps,
) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LoginProvider>
      <PageContent
        toggleSidebar={toggleSidebar}
        appName={appName}
        isSidebarOpen={isSidebarOpen}
      >
        {children}
      </PageContent>
    </LoginProvider>
  );
}
