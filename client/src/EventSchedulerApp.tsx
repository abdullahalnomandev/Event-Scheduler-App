import React, { useLayoutEffect, useState } from "react";
import EventControls from "./components/Events/EventControls";
import EventForm from "./components/Events/EventForm";
import EventList from "./components/Events/EventList";
import EventPagination from "./components/Events/EventPagination";
import Header from "./components/UI/Header";
import Modal from "./components/UI/Modal";
import type { Event } from "./types";
import type { IPaginationOptions } from "./types/common";
import { EventApi } from "./utils/api";

const EventSchedulerApp: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<"All" | "Work" | "Personal" | "Other">(
    "All"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 5,
  });
  const [total, setTotal] = useState(0);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = filter === "All" ? {} : { category: filter };
      const sortedPagination = {
        ...pagination,
        sortBy: "date",
        sortOrder: "asc",
      };
      const response = await EventApi.getAllEvents({
        filters,
        pagination: sortedPagination,
      });
      setEvents(response.data);
      setTotal(response.meta.total);
    } catch (err) {
      setError("Failed to fetch events.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchEvents();
  }, [filter, pagination.page, pagination.limit]);

  const handleAddEvent = async (
    newEventData: Omit<Event, "id" | "isArchived" | "category">
  ) => {
    try {
      await EventApi.createEvent(newEventData);
      setIsModalOpen(false);
      fetchEvents();
    } catch (err) {
      setError("Failed to create event.");
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await EventApi.deleteEvent(id);
      fetchEvents();
    } catch (err) {
      setError("Failed to delete event.");
      console.error(err);
    }
  };

  const handleToggleArchive = async (eventId: string) => {
    try {
      const event = events.find(({ id }) => id === eventId);
      if (event) {
        await EventApi.updateEventArchivedStatus(eventId, event.archived);
        fetchEvents();
      }
    } catch (err) {
      setError("Failed to toggle archive status.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-10">
          <EventControls
            filter={filter}
            onFilterChange={setFilter}
            onAddClick={() => setIsModalOpen(true)}
          />

          <div className="relative min-h-[300px]">
            {" "}
            {/* Added a div to ensure stable height */}
            {loading && (
              <p className="text-center text-gray-300">Loading events...</p>
            )}
            {error && (
              <p className="text-center text-red-500">Error: {error}</p>
            )}
            {!loading && !error && (
              <>
                <EventList
                  events={events}
                  onDeleteEvent={handleDeleteEvent}
                  onToggleArchive={handleToggleArchive}
                />
                {total > 0 && (
                  <EventPagination
                    total={total}
                    pagination={pagination}
                    onPageChange={(page) =>
                      setPagination({ ...pagination, page })
                    }
                    onLimitChange={(limit) => setPagination({ page: 1, limit })}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EventForm onAddEvent={handleAddEvent} editingEvent={null} />
      </Modal>
    </div>
  );
};

export default EventSchedulerApp;
