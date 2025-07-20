import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IEvent } from './event.interface';
import { categorizeEvent } from './event.utils';

const events: IEvent[] = [];
let nextId = 1;

const createEvent = async (
  eventData: Omit<IEvent, 'id' | 'archived' | 'category'>
): Promise<IEvent> => {
  const category = categorizeEvent(eventData.title, eventData.notes);
  const newEventData: IEvent = {
    id: String(nextId++),
    archived: false,
    category,
    ...eventData,
  };
  events.push(newEventData);
  return newEventData;
};

const getAllEvents = async (
  filters: Partial<IEvent>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEvent[]>> => {
  const { sortBy, sortOrder, page, limit, skip } =
    paginationHelper(paginationOptions);

  const filteredEvents = events.filter(event => {
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        if (event[key as keyof IEvent] !== filters[key as keyof IEvent]) {
          return false;
        }
      }
    }
    return true;
  });

  if (sortBy && sortOrder) {
    filteredEvents.sort((a, b) => {
      const aValue = a[sortBy as keyof IEvent];
      const bValue = b[sortBy as keyof IEvent];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }

  const paginatedEvents = filteredEvents.slice(skip, skip + limit);
  const total = filteredEvents.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: paginatedEvents,
  };
};

const updateEventArchivedStatus = async (
  id: string,
  archived: boolean
): Promise<IEvent | null> => {
  const index = events.findIndex(event => event.id === id);
  if (index === -1) {
    return null;
  }
  events[index].archived = archived;
  return events[index];
};

const deleteEvent = async (id: string): Promise<IEvent | null> => {
  const index = events.findIndex(event => event.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedEvent] = events.splice(index, 1);
  return deletedEvent;
};

export const EventService = {
  createEvent,
  getAllEvents,
  updateEventArchivedStatus,
  deleteEvent,
};
