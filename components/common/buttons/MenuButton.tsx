type MenuButtonProps = {
    children: any;
    onClick: () => void;
}

export default function MenuButton({ children, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      class="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded transition-colors duration-200 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
    >
      {children}
    </button>
  );
}
