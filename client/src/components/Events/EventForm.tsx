import React, { useEffect, useState } from "react";
import type { Event } from "../types";

interface EventFormProps {
  onAddEvent: (event: Event) => void;
  editingEvent: Event | null; // New prop for editing
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, editingEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setTime(editingEvent.time);
      setNotes(editingEvent.notes || "");
    } else {
      // Clear form when not editing
      setTitle("");
      setDate("");
      setTime("");
      setNotes("");
    }
  }, [editingEvent]);

  const categorizeEvent = (
    eventTitle: string
  ): "Work" | "Personal" | "Other" => {
    const lowerCaseTitle = eventTitle.toLowerCase();
    if (
      lowerCaseTitle.includes("meeting") ||
      lowerCaseTitle.includes("project") ||
      lowerCaseTitle.includes("client")
    ) {
      return "Work";
    } else if (
      lowerCaseTitle.includes("birthday") ||
      lowerCaseTitle.includes("family") ||
      lowerCaseTitle.includes("party")
    ) {
      return "Personal";
    }
    return "Other";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !date || !time) {
      setError("Title, Date, and Time are required.");
      return;
    }

    const eventToSave: Event = editingEvent
      ? {
          ...editingEvent,
          title,
          date,
          time,
          notes,
          category: categorizeEvent(title),
        }
      : {
          id: Date.now().toString(),
          title,
          date,
          time,
          notes,
          category: categorizeEvent(title),
          isArchived: false,
        };

    onAddEvent(eventToSave);
    // Form cleared by useEffect when editingEvent is set to null in parent
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-xl border border-gray-600 animate-fade-in text-gray-100 dark:bg-gray-700 dark:border-gray-600 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-7 text-center">
        {editingEvent ? "Edit Event" : "Create New Event"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-600 border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-100 placeholder-gray-400 transition duration-150 ease-in-out dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 text-base"
            placeholder="e.g., Team Sync Meeting, Sarah's Birthday"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-600 border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-100 transition duration-150 ease-in-out dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 text-base"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-600 border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-100 transition duration-150 ease-in-out dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 text-base"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-600 border border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-100 placeholder-gray-400 transition duration-150 ease-in-out dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 text-base"
            placeholder="Add any additional details or reminders here..."
          ></textarea>
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-3 font-medium" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 text-lg font-semibold tracking-wide transform hover:scale-100 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700 sm:p-4"
        >
          {editingEvent ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
