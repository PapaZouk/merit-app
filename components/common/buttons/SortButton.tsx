type SortButtonProps = {
  handleSort: (type: string) => void;
  type: string;
  classes?: string;
};

export default function SortButton(
  { handleSort, type, classes }: SortButtonProps,
) {
  return (
    <button
      type="button"
      onClick={() => handleSort(type)}
      class={`flex items-center bg-gradient-to-r from-gray-500 to-gray-600 text-white
           mr-2 px-3 py-1 rounded hover:from-gray-600 hover:to-gray-700 transition-colors 
           duration-300 ${classes} sm:mr-4 sm:px-4 sm:py-2`}
    >
      {type}
    </button>
  );
}
