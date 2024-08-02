import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationProps } from "@/types/types";

function PaginationSection({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const hasNext = currentPage < Math.ceil(totalItems / itemsPerPage);
  const hasPrevious = currentPage > 1;

  return (
    <Pagination>
      <PaginationContent className="text-slate-800 dark:text-slate-200">
        {hasPrevious && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>
        )}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index} className="cursor-pointer">
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {hasNext && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationSection;
