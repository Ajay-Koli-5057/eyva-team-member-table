interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
  }) => {
    return (
      <div className="p-4 border-t flex justify-between items-center">
        <button
          onClick={onPrevious}
          className={`bg-gray-300 text-gray-800 px-4 py-2 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNext}
          className={`bg-gray-300 text-gray-800 px-4 py-2 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  