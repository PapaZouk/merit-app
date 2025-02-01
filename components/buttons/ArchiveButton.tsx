import { FolderArchive } from "https://esm.sh/lucide-preact@latest";

type ArchiveButtonProps = {
  handleArchive: () => void;
  extraClasses?: string;
  disabled?: boolean;
};

export default function ArchiveButton(
  { handleArchive, extraClasses, disabled }: ArchiveButtonProps,
) {
  const classes = `flex items-center bg-gradient-to-r from-blue-400 to-blue-500
        text-white px-3 py-2 rounded hover:from-blue-400 hover:to-blue-600
        transition-colors duration-300 text-sm ${extraClasses}`;

  return (
    <button
      onClick={handleArchive}
      class={classes}
      disabled={disabled}
    >
      <FolderArchive size={16} class="pt-1" />
      <span class="hidden lg:inline md:ml-4">Archiwizuj</span>
    </button>
  );
}
