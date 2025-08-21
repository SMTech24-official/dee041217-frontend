const MyPagination = ({
  currentPage,
  totalItem,
  limit,
  onPageChange,
}: {
  currentPage: number;
  totalItem: number;
  limit: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPage = Math.ceil(totalItem / limit);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPage <= 9) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(currentPage - 4, 2);
      let end = Math.min(currentPage + 4, totalPage - 1);

      if (currentPage <= 5) {
        start = 2;
        end = 9;
      }

      if (currentPage >= totalPage - 4) {
        start = totalPage - 8;
        end = totalPage - 1;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPage - 1) {
        pages.push("...");
      }

      pages.push(totalPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        className="bg-gradient-to-b from-green-400 to-green-500 text-white px-2 py-1 rounded-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span key={idx} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={num}
            className={`px-2 py-1 border border-green-400 rounded-sm ${
              currentPage === num ? "bg-gradient-to-b from-green-400 to-green-500 text-white" : ""
            }`}
            onClick={() => onPageChange(num as number)}
          >
            {num}
          </button>
        )
      )}

      <button
        className="bg-gradient-to-b from-green-400 to-green-500 text-white px-2 py-1 rounded-sm"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default MyPagination;
