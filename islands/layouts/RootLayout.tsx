import { h } from 'preact';
import { useState } from 'preact/hooks';
import Sidebar from "../sidebar.tsx";
import MainNavigation from "../mainNavigation.tsx";

type RootLayoutProps = {
  children: h.JSX.Element,
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div class="flex flex-col h-screen">
      <MainNavigation toggleSidebar={toggleSidebar} />
      <div class="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main class="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}