import React from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageSelect,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = "...";

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPages = [1, 2, 3];
      const endPages = [totalPages - 2, totalPages - 1, totalPages];

      if (currentPage <= 5) {
        pageNumbers.push(...startPages, ellipsis, ...endPages);
      } else if (currentPage > totalPages - 5) {
        pageNumbers.push(
          ...startPages,
          ellipsis,
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          ...endPages
        );
      } else {
        pageNumbers.push(
          ...startPages,
          ellipsis,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          ellipsis,
          ...endPages
        );
      }
    }
    return pageNumbers;
  };
  return (
    <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center space-y-2">
      <button
        onClick={onPrevious}
        className={`bg-white border border-black text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 hover:border-none mb-2 sm:mb-0 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        <span className="mr-2">
          <i className="fas fa-arrow-left"></i>
        </span>
        Previous
      </button>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 py-1 text-gray-800">
              {page}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageSelect(Number(page))}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage
                  ? "bg-purple-200 text-purple-800"
                  : "bg-white border text-gray-800 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={onNext}
        className={`bg-white border border-black text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 hover:border-none ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        Next
        <span className="ml-2">
          <i className="fas fa-arrow-right"></i>
        </span>
      </button>
    </div>
  );
};

export default Pagination;
