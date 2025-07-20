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
    <div className="grid grid-cols-9 items-center gap-4 py-3 px-4 sm:px-5 border-b border-gray-600 last:border-b-0 group transition-colors duration-200 hover:bg-gray-700 dark:hover:bg-gray-700 relative">
      {/* Title Column */}
      <div className="col-span-2 text-white font-medium truncate z-20">
        {event.title}
      </div>

      {/* Date Column */}
      {/* Date Column */}
      <div className="col-span-1 text-gray-300 text-sm truncate z-20">
        {format(new Date(event.date), "dd MMMM yyyy")}
      </div>

      {/* Time Column */}
      <div className="col-span-1 text-gray-300 text-sm truncate z-20">
        {format(parse(event.time, "HH:mm", new Date()), "hh:mm a")}
      </div>
      {/* Notes Column */}
      <div className="col-span-2 text-gray-400 text-sm truncate z-20">
        {event.notes || "---"}
      </div>

      {/* Category Column */}
      <div className="col-span-1 text-sm font-semibold truncate z-20">
        <span className={`${categoryColors[event.category]}`}>
          {event.category}
        </span>
      </div>

      {/* Status Column */}
      <div className="col-span-1 flex items-center justify-center z-20">
        <button
          onClick={() => onToggleArchive(event.id)} // Use onToggleArchive
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              event.archived
                ? "bg-yellow-700 text-yellow-100"
                : "bg-green-700 text-green-100"
            }
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700
          `}
        >
          {event.isArchived ? "Archived" : "Archive"}
        </button>
      </div>

      {/* Actions Column */}
      <div className="col-span-1 flex items-center justify-end space-x-3 z-20">
        <button
          onClick={() => onDeleteEvent(event.id)}
          className="text-red-400 hover:text-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700 rounded-md p-1"
          aria-label="Delete event"
        >
          <FaTrashAlt className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EventItem;
