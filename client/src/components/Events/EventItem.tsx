import { format, parse } from "date-fns";
import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import toggle icons
import type { Event } from "../types";

interface EventItemProps {
  event: Event;
  onDeleteEvent: (id: string) => void;
  onToggleArchive: (id: string) => void; // Re-add onToggleArchive prop
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  onDeleteEvent,
  onToggleArchive, // Destructure onToggleArchive
}) => {
  const categoryColors = {
    Work: "text-blue-400",
    Personal: "text-green-400",
    Other: "text-gray-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-9 items-center gap-4 py-3 px-4 sm:px-5 border-b border-gray-100 dark:border-gray-600 last:border-b-0 group transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 relative rounded-lg sm:rounded-none mb-4 sm:mb-0 shadow-md sm:shadow-none bg-white dark:bg-gray-900">
      <div className="sm:col-span-2 text-gray-900 dark:text-white font-medium truncate z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300">
          Title:{" "}
        </span>
        {event.title}
      </div>

      {/* Date Column */}
      <div className="sm:col-span-1 text-gray-600 dark:text-gray-300 text-sm truncate z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300">
          Date:{" "}
        </span>
        {format(new Date(event.date), "dd MMMM yyyy")}
      </div>

      {/* Time Column */}
      <div className="sm:col-span-1 text-gray-600 dark:text-gray-300 text-sm truncate z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300">
          Time:{" "}
        </span>
        {format(parse(event.time, "HH:mm", new Date()), "hh:mm a")}
      </div>

      {/* Notes Column */}
      <div className="sm:col-span-2 text-gray-500 dark:text-gray-400 text-sm truncate z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300">
          Notes:{" "}
        </span>
        {event.notes || "---"}
      </div>

      {/* Category Column */}
      <div className="sm:col-span-1 text-sm font-semibold truncate z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300">
          Category:{" "}
        </span>
        <span className={`${categoryColors[event.category]}`}>
          {event.category}
        </span>
      </div>

      {/* Status Column */}
      <div className="sm:col-span-1 flex items-center sm:justify-center justify-start z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300 mr-2">
          Status:{" "}
        </span>
        <button
          onClick={() => onToggleArchive(event.id)}
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              event.archived
                ? "bg-yellow-600 text-yellow-100"
                : "bg-green-600 text-green-100"
            }
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 dark:focus:ring-offset-gray-800
          `}
        >
          {event.archive ? "Archived" : "Archive"}
        </button>
      </div>

      {/* Actions Column */}
      <div className="sm:col-span-1 flex items-center sm:justify-end justify-start space-x-3 z-20">
        <span className="sm:hidden font-semibold text-gray-700 dark:text-gray-300">
          Actions:{" "}
        </span>
        <button
          onClick={() => onDeleteEvent(event.id)}
          className="text-red-500 hover:text-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700 dark:focus:ring-offset-gray-800 rounded-md p-1"
          aria-label="Delete event"
        >
          <FaTrashAlt className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EventItem;
