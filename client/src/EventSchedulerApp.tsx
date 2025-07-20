import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import EventForm from "./components/Events/EventForm";
import EventList from "./components/Events/EventList";
import Modal from "./components/Events/Modal";
import Header from "./components/UI/Header";
import type { Event } from "./types";

const EventSchedulerApp: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<"All" | "Work" | "Personal" | "Other">(
    "All"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null); // State for event being edited

  // Load events from local storage on initial mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to local storage whenever events state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddOrUpdateEvent = (newEvent: Event) => {
    if (editingEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === newEvent.id ? newEvent : event))
      );
      setEditingEvent(null); // Clear editing state
    } else {
      // Add new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleToggleArchive = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, isArchived: !event.isArchived } : event
      )
    );
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = useMemo(() => {
    let currentEvents = events;

    if (filter === "Work") {
      currentEvents = currentEvents.filter(
        (event) => event.category === "Work"
      );
    } else if (filter === "Personal") {
      currentEvents = currentEvents.filter(
        (event) => event.category === "Personal"
      );
    } else if (filter === "Other") {
      currentEvents = currentEvents.filter(
        (event) => event.category === "Other"
      );
    }

    return currentEvents;
  }, [events, filter]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden ring-1 ring-gray-700 p-6 sm:p-8 lg:p-10 max-w-full lg:max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 text-center mb-8 tracking-tight leading-tight">
            Your Professional Event Dashboard
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-1/2 lg:w-1/3">
              <label htmlFor="categoryFilter" className="sr-only">
                Filter by Category
              </label>
              <select
                id="categoryFilter"
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value as "All" | "Work" | "Personal" | "Other"
                  )
                }
                className="block w-full border border-gray-600 rounded-lg shadow-sm p-3 pr-10 text-base focus:ring-blue-500 focus:border-blue-500 appearance-none bg-gray-700 text-gray-100 transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="All">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setEditingEvent(null);
              }} // Open for new event
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700"
            >
              <FaPlus className="h-5 w-5" />
              <span>Add New Event</span>
            </button>
          </div>

          <EventList
            events={filteredEvents}
            onDeleteEvent={handleDeleteEvent}
            onToggleArchive={handleToggleArchive}
            onEditEvent={handleEditEvent}
          />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
      >
        <EventForm
          onAddEvent={handleAddOrUpdateEvent}
          editingEvent={editingEvent}
        />
      </Modal>
    </div>
  );
};

export default EventSchedulerApp;
