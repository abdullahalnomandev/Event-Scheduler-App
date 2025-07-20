import React from "react";
import type { IPaginationOptions } from "../../types/common";

interface EventPaginationProps {
  total: number;
  pagination: IPaginationOptions;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const EventPagination: React.FC<EventPaginationProps> = ({
  total,
  pagination,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(total / (pagination.limit || 1));
  const currentPage = pagination.page || 1;

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 rounded text-sm font-medium transition duration-200 ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6 border-t border-gray-700 pt-4">
      {/* Limit selector */}
      <div className="flex items-center justify-center gap-1 mb-4 pr-3">
        <label htmlFor="limitSelect" className="text-sm text-gray-300">
          Events per page:
        </label>
        <select
          id="limitSelect"
          value={pagination.limit || 5}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Page buttons */}
      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {renderPageButtons()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventPagination;
