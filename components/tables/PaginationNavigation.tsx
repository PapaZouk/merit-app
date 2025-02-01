import { h } from "preact";

type TablePaginationNavigationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

export default function PaginationNavigation(
  { currentPage, totalPages, handlePreviousPage, handleNextPage }:
    TablePaginationNavigationProps,
): h.JSX.Element {
  return (
    <div class="flex justify-between mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Poprzednie
      </button>
      <span class="px-4 py-2">
        Strona {currentPage} z {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Następne
      </button>
    </div>
  );
}
