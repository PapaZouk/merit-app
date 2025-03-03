import MenuButton from "../../common/buttons/MenuButton.tsx";
import { LockKeyhole, Shield } from "https://esm.sh/lucide-preact@latest";

type SettingsNavigationProps = {
  onSelect: (section: string) => void;
};

export default function SettingsNavigation(
  { onSelect }: SettingsNavigationProps,
) {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 shadow-md rounded-lg mb-2">
      <MenuButton onClick={() => onSelect("general")}>
        <Shield class="mr-2" /> Ustawienia ogólne
      </MenuButton>
      <MenuButton onClick={() => onSelect("security")}>
        <LockKeyhole class="mr-2" /> Bezpieczeństwo
      </MenuButton>
    </div>
  );
}
