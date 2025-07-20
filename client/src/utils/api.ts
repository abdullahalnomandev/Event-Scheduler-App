import type { Event } from "../types";
import type { IGenericResponse, IPaginationOptions } from "../types/common";

const API_BASE_URL = "http://localhost:5000/api/v1/events";

interface EventFilters {
  category?: "Work" | "Personal" | "Other";
}

interface GetAllEventsParams {
  filters?: EventFilters;
  pagination?: IPaginationOptions;
}

const getAllEvents = async ({
  filters,
  pagination,
}: GetAllEventsParams): Promise<IGenericResponse<Event[]>> => {
  const params = new URLSearchParams();
  if (pagination?.page) {
    params.append("page", String(pagination.page));
  }
  if (pagination?.limit) {
    params.append("limit", String(pagination.limit));
  }
  if (filters?.category) {
    params.append("category", filters.category);
  }

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const createEvent = async (
  eventData: Omit<Event, "id" | "isArchived" | "category">
): Promise<Event> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const updateEventArchivedStatus = async (
  id: string,
  isArchived: boolean
): Promise<Event> => {
  console.log("isArchived", isArchived);

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ archived: !isArchived }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const deleteEvent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const EventApi = {
  getAllEvents,
  createEvent,
  updateEventArchivedStatus,
  deleteEvent,
};
