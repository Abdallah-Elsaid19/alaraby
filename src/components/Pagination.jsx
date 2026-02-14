"use client";

export default function Pagination({ currentPage, totalPages, paginate }) {
  const pageNumbers = [];

  // Display up to 3 pages + first + last
  let startPage = Math.max(currentPage - 1, 2); // start after first page
  let endPage = Math.min(currentPage + 1, totalPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">

      {/* Prev */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-40"
      >
        Prev
      </button>

      {/* First page */}
      <button
        onClick={() => paginate(1)}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-[#00a0a0] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        1
      </button>

      {/* Ellipsis if needed */}
      {startPage > 2 && <span className="px-2">...</span>}

      {/* Middle pages */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded ${
            number === currentPage
              ? "bg-[#00a0a0] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Ellipsis if needed */}
      {endPage < totalPages - 1 && <span className="px-2">...</span>}

      {/* Last page */}
      {totalPages > 1 && (
        <button
          onClick={() => paginate(totalPages)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-[#00a0a0] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
