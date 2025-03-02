import {LoginProvider} from "../../../components/context/LoginProvider.tsx";
import UserSettings from "../../../islands/user/settings/UserSettings.tsx";

export default function GeneralSettings() {
  return (
    <LoginProvider>
      <UserSettings />
    </LoginProvider>
  );
}
