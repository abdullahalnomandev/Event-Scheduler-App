import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import type { Event } from "../../types";

interface EventFormProps {
  onAddEvent: (
    newEventData: Omit<Event, "id" | "isArchived" | "category">
  ) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: null as Date | null,
    time: null as Date | null,
    notes: "",
  });
  const [error, setError] = useState("");

  const categorizeEvent = (text: string): "Work" | "Personal" | "Other" => {
    const content = text.toLowerCase();
    const workKeywords = ["meeting", "project", "client", "deadline"];
    const personalKeywords = ["birthday", "family", "party", "anniversary"];

    if (workKeywords.some((word) => content.includes(word))) return "Work";
    if (personalKeywords.some((word) => content.includes(word)))
      return "Personal";
    return "Other";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // For DatePicker changes
  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleTimeChange = (time: Date | null) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);

    e.preventDefault();
    setError("");

    const { title, date, time, notes } = formData;

    if (!title || !date || !time) {
      setError("Title, Date, and Time are required.");
      return;
    }

    const result = await onAddEvent({
      title,
      date: format(date, "yyyy-MM-dd"),
      time: format(time, "HH:mm"),
      notes,
      category: categorizeEvent(`${title} ${notes}`),
    });
    if (result) {
      setIsSubmitting(false);
    }

    setFormData({
      title: "",
      date: null,
      time: null,
      notes: "",
    });
  };

  const inputBaseClass =
    "w-full rounded-md bg-gray-700 border dark:border-gray-600 p-3 pr-10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-500 transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-base";

  return (
    <div className=" dark:bg-gray-900 rounded-lg shadow-lg border border-gray-700 dark:border-gray-600 p-5 max-w-lg mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`${inputBaseClass} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
            placeholder="e.g., Client Call, Birthday Dinner"
            required
            autoComplete="off"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Date Picker */}
          <div className="relative">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center justify-center">
              <FaRegCalendarAlt
                className="absolute top-3.5 left-3 text-gray-400"
                size={16}
              />
              <DatePicker
                id="date"
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                required
                filterDate={(date) => date >= new Date()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 text-gray-800 shadow-sm"
              />
            </div>
          </div>

          {/* Time Picker */}
          <div className="relative">
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Time <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center justify-center">
              <FaRegClock
                className="absolute top-3.5 left-3 text-gray-400"
                size={16}
              />
              <DatePicker
                id="time"
                selected={formData.time}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="hh:mm aa"
                placeholderText="Select time"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-50 text-gray-900 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="relative">
          <label
            htmlFor="notes"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Notes (Optional)
          </label>

          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className={`${inputBaseClass}  resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600`}
            placeholder="Add any additional details or reminders here..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-1 font-semibold" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900 dark:active:bg-blue-900"
          } focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 text-white font-bold py-3 rounded-md transition transform hover:scale-105 duration-200`}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
