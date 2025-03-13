import { useState } from "preact/hooks";
import SaveButton from "../../../../components/common/buttons/SaveButton.tsx";
import ToggleSwitch from "../../../../components/common/toggles/ToggleSwitch.tsx";
import { getAuthClient } from "../../../../components/utils/auth/auth-client/authClient.ts";
import ErrorMessage from "../../../../components/common/messages/ErrorMessage.tsx";
import SuccessMessage from "../../../../components/common/messages/SuccessMessage.tsx";

export default function PasswordSettings() {
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const errorTimeout = 3000;

  const handleToggle = () => {
    setChangePassword(!changePassword);
  };

  const handlePasswordChange = (e: Event, type: string) => {
    const target = e.target as HTMLInputElement;

    if (type === "newPassword") {
      setNewPassword(target.value);
      if (confirmPassword && confirmPassword !== target.value) {
        setPasswordError("Hasła nie pasują do siebie");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, errorTimeout);
      } else {
        setPasswordError(null);
      }
    } else if (type === "confirmPassword") {
      setConfirmPassword(target.value);
      if (newPassword && newPassword !== target.value) {
        setPasswordError("Hasła nie pasują do siebie");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, errorTimeout);
      } else {
        setPasswordError(null);
      }
    }
  };

  function resetError() {
    setTimeout(() => {
      setShowError(false);
    }, errorTimeout);
  }

  const handleSave = async (event: Event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Wszystkie pola muszą być wypełnione");
      setShowError(true);
      resetError();
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Hasło musi mieć co najmniej 8 znaków");
      setShowError(true);
      resetError();
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError("Nowe hasło nie może być takie samo jak stare hasło");
      setShowError(true);
      resetError();
      return;
    }

    try {
      if (newPassword !== confirmPassword) {
        setPasswordError("Hasła nie pasują do siebie");
        return;
      }
      const authClient = getAuthClient();
      const result = await authClient.updatePassword(
        newPassword,
        currentPassword,
      );
      console.log("Password update result:", result);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div class="flex flex-col w-full mb-4">
      <div class="flex items-center justify-between w-full mb-4">
        <h1 class="text-lg font-medium flex-grow text-gray-700">
          Zmiana hasła
        </h1>
        <div class="flex-shrink-0">
          <ToggleSwitch
            toggled={changePassword}
            onToggle={handleToggle}
            toggleDisabled={false}
          />
        </div>
      </div>
      {changePassword && (
        <form class="flex flex-col items-center space-y-4">
          <div class="w-full sm:w-3/4 lg:w-1/2">
            <label class="block text-gray-700">Obecne hasło</label>
            <input
              type="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded"
              autocomplete="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target?.value)}
            />
          </div>
          <div class="w-full sm:w-3/4 lg:w-1/2">
            <label class="block text-gray-700">Nowe hasło</label>
            <input
              type="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={newPassword ?? ""}
              onChange={(e) => handlePasswordChange(e, "newPassword")}
            />
          </div>
          <div class="w-full sm:w-3/4 lg:w-1/2">
            <label class="block text-gray-700">Potwierdź nowe hasło</label>
            <input
              type="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={confirmPassword ?? ""}
              onChange={(e) => handlePasswordChange(e, "confirmPassword")}
            />
          </div>
          {passwordError && (
            <ErrorMessage>
              {passwordError}
            </ErrorMessage>
          )}
          <div class="w-full sm:w-3/4 lg:w-1/2 flex justify-center">
            <SaveButton onClick={handleSave} />
          </div>
        </form>
      )}
      {showSuccess && (
        <SuccessMessage>
          <p>
            Hasło zostało zmienione
          </p>
        </SuccessMessage>
      )}
    </div>
  );
}
