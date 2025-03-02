import GenerateQRCode from "../../../islands/auth/GenerateQRCode.tsx";

type SettingsContentProps = {
  selectedSection: string;
};

export default function SettingsContent(
  { selectedSection }: SettingsContentProps,
) {
  return (
    <div class="flex flex-col w-full p-2 sm:p-2">
      {selectedSection === "general" && <div>Ustawienia ogólne</div>}
      {selectedSection === "security" && <GenerateQRCode />}
    </div>
  );
}
