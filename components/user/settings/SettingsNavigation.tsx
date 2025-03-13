import MenuButton from "../../common/buttons/MenuButton.tsx";
import { LuLockKeyhole, LuShield } from "@preact-icons/lu";

type SettingsNavigationProps = {
  onSelect: (section: string) => void;
};

export default function SettingsNavigation(
  { onSelect }: SettingsNavigationProps,
) {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 shadow-md rounded-lg mb-2">
      <MenuButton onClick={() => onSelect("general")}>
        <LuShield class="mr-2" /> Ustawienia ogólne
      </MenuButton>
      <MenuButton onClick={() => onSelect("security")}>
        <LuLockKeyhole class="mr-2" /> Bezpieczeństwo
      </MenuButton>
    </div>
  );
}
