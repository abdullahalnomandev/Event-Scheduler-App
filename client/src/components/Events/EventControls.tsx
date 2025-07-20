import React from "react";
import { FaPlus } from "react-icons/fa";

interface Props {
  filter: "All" | "Work" | "Personal" | "Other";
  onFilterChange: (val: "All" | "Work" | "Personal" | "Other") => void;
  onAddClick: () => void;
}

const EventControls: React.FC<Props> = ({
  filter,
  onFilterChange,
  onAddClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
      {/* Category Filter */}
      <div className="relative w-full sm:w-1/2 lg:w-1/3">
        <label htmlFor="categoryFilter" className="sr-only">
          Filter by Category
        </label>
        <select
          id="categoryFilter"
          value={filter}
          onChange={(e) =>
            onFilterChange(
              e.target.value as "All" | "Work" | "Personal" | "Other"
            )
          }
          className="block w-full border border-gray-600 rounded-lg shadow-sm p-3 pr-10 text-base focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-100 transition duration-150 ease-in-out"
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Add Event Button */}
      <button
        onClick={onAddClick}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center space-x-2"
      >
        <FaPlus className="h-5 w-5" />
        <span>Add New Event</span>
      </button>
    </div>
  );
};

export default EventControls;
