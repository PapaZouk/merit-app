import ToggleSwitch from "../../../common/toggles/ToggleSwitch.tsx";

type SwitchProps = {
  toggleState: boolean;
  handleToggle: (enabled: boolean) => void;
  isToggleDisabled: boolean;
  title: string;
};

export default function SettingsToggle(
  { toggleState, handleToggle, isToggleDisabled, title }: SwitchProps,
) {
  return (
    <div class="flex items-center justify-between w-full mb-4">
      <span class="text-lg font-medium flex-grow text-gray-700">
        {title}
      </span>
      <div class="flex-shrink-0">
        <ToggleSwitch
          toggled={toggleState}
          onToggle={handleToggle}
          toggleDisabled={isToggleDisabled}
        />
      </div>
    </div>
  );
}
