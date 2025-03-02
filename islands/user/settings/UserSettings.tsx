import { NotificationsProvider } from "../../../components/context/NotificationsProvider.tsx";
import SettingsNavigation from "../../../components/user/settings/SettingsNavigation.tsx";
import { useLogin } from "../../../components/context/LoginProvider.tsx";
import { useState } from "preact/hooks";
import SettingsContent from "../../../components/user/settings/SettingsContent.tsx";

export default function UserSettings() {
  const { userId } = useLogin();
  const [selectedSection, setSelectedSection] = useState<string>("general");
  return (
    <NotificationsProvider userId={userId}>
      <div class="w-full">
        <SettingsNavigation onSelect={setSelectedSection} />
        <SettingsContent selectedSection={selectedSection} />
      </div>
    </NotificationsProvider>
  );
}
