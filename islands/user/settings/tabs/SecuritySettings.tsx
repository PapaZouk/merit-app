import { useState } from "preact/hooks";
import { useLogin } from "../../../../components/context/LoginProvider.tsx";
import MfaSetup from "../../../../components/user/settings/tabs/MfaSetup.tsx";
import SettingsToggle from "../../../../components/user/settings/toggles/SettingsToggle.tsx";
import PasswordSettings from "./PasswordSettings.tsx";

export default function SecuritySettings() {
  const { user } = useLogin();
  const [mfaEnabled, setMfaEnabled] = useState<boolean>(
    user?.otpEnabled || false,
  );

  const handleMfaToggle = (enabled: boolean) => {
    setMfaEnabled(enabled);
  };

  const isMfaToggleDisabled = user?.otpEnabled || false;

  return (
    <>
      <div class="flex flex-col w-full p-4 mb-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
        <SettingsToggle
          toggleState={mfaEnabled}
          handleToggle={handleMfaToggle}
          isToggleDisabled={isMfaToggleDisabled}
          title="Włącz uwierzytelnianie MFA"
        />
        {!mfaEnabled && (
          <div class="mt-4 p-4 bg-white rounded-lg shadow-inner">
            <h1 class="text-2xl font-bold text-gray-800">
              Uwierzytelnianie dwuetapowe
            </h1>
            {user?.otpEnabled
              ? (
                <div class="mt-2 text-sm text-gray-600">
                  Uwierzytelnianie dwuetapowe jest włączone dla tego konta.
                </div>
              )
              : (
                <p class="mt-2 text-gray-700">
                  Uwierzytelnianie dwuetapowe zwiększa bezpieczeństwo Twojego
                  konta. Przygotuj się do skanowania kodu QR w aplikacji
                  uwierzytelniającej. Po zeskanowaniu kodu, wprowadź kod
                  weryfikacyjny, który pojawi się w aplikacji.
                </p>
              )}
            <MfaSetup />
          </div>
        )}
      </div>
      <div class="flex flex-col w-full p-4 mb-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
        <PasswordSettings />
      </div>
    </>
  );
}
