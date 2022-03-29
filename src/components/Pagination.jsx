/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const PaginatedNumbers = ({
  totalPages,
  page,
  changePage,
  maxPageNumberLimit,
  minPageNumberLimit,
}) => {
  return Array.from({ length: totalPages }, (num, index) => {
    if (index < maxPageNumberLimit + 1 && index > minPageNumberLimit)
      return (
        <button
          onClick={() => changePage(index)}
          className={`bg-white ${
            page === index ? "bg-black text-white" : "hover:bg-gray-50"
          } border-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
        >
          {index}{" "}
        </button>
      );
    else {
      return null;
    }
  });
};

export default function Pagination({
  totalPages,
  pageSize,
  page,
  changePage,
  incrementPage,
  decrementPage,
  minPageNumberLimit,
  maxPageNumberLimit,
}) {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          onClick={decrementPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={incrementPage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">{totalPages * pageSize}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              disabled={page === 1}
              onClick={decrementPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <PaginatedNumbers
              totalPages={totalPages}
              changePage={changePage}
              page={page}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
            <button
              disabled={page === totalPages - 1}
              onClick={incrementPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
