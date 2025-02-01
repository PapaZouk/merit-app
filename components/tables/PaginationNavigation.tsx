import { h } from "preact";
import NextButton from "../buttons/NextButton.tsx";
import PreviousButton from "../buttons/PreviousButton.tsx";

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
        <PreviousButton
            disabled={currentPage === 1}
            handlePrevious={handlePreviousPage}
        />
      <span class="px-4 py-2">
        Strona {currentPage} z {totalPages}
      </span>
      <NextButton
        disabled={currentPage === totalPages}
        handleNext={handleNextPage}
      />
    </div>
  );
}
