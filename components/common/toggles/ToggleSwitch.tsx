import { LuCheck, LuMinus } from "@preact-icons/lu";

type ToggleSwitchProps = {
  toggled: boolean;
  onToggle: (enabled: boolean) => void;
  toggleDisabled?: boolean;
};

export default function ToggleSwitch({ toggled, onToggle, toggleDisabled }: ToggleSwitchProps) {
  return (
    <div
      className={`flex items-center p-2 ${
        toggled ? "bg-green-500" : "bg-gray-300"
      } rounded-full w-16 h-8 ${!toggleDisabled && "cursor-pointer"}`}
      onClick={() => !toggleDisabled && onToggle(!toggled)}
    >
      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full bg-white transform transition-transform ${
          toggled ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {toggled
          ? <LuCheck className="w-4 h-4 text-green-500" />
          : <LuMinus className="w-4 h-4 text-gray-500" />}
      </div>
    </div>
  );
}
