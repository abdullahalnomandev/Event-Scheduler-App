import React from "react";
import type { Event } from "../types";
import EventItem from "./EventItem";

interface EventListProps {
  events: Event[];
  onDeleteEvent: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onDeleteEvent,
  onToggleArchive,
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center text-gray-400 text-base sm:text-xl py-8 sm:py-12 rounded-lg bg-gray-100 shadow-inner border border-gray-300 animate-fade-in-up dark:bg-gray-800 dark:border-gray-600">
        <p className="mb-2 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          No Events Scheduled
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Start by adding a new event to your professional dashboard!
        </p>
      </div>
    );
  }

  // Sorting events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 dark:text-gray-100">
        Upcoming Events
      </h2>
      <div className="bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-600">
        {/* Table Header */}
        <div className="sm:grid  hidden   grid-cols-9 items-center gap-4 py-3 px-4 sm:px-5 text-gray-800 bg-gray-200 dark:bg-gray-800 light:bg-gray-300 border-b border-gray-200 dark:border-gray-600 font-semibold dark:text-gray-300 text-sm uppercase">
          <div className="col-span-2">Title</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Time</div>
          <div className="col-span-2">Notes</div>
          <div className="col-span-1">Category</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Event Items */}
        <div className="dark:bg-gray-900 bg-white">
          {sortedEvents.map((event) => (
            <EventItem
              key={event.id}
              event={event}
              onDeleteEvent={onDeleteEvent}
              onToggleArchive={onToggleArchive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
