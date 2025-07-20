// import httpStatus from 'http-status';
// import { SortOrder } from 'mongoose';
// import ApiError from '../../../errors/ApiError';
// import { paginationHelper } from '../../../helpers/paginationHelper';
// import { IGenericResponse } from '../../../interfaces/common';
// import { IPaginationOptions } from '../../../interfaces/pagination';
// import { IEvent } from './event.interface';
// import { Event } from './event.model';
// import { categorizeEvent } from './event.utils';

// const createEvent = async (
//   eventData: Omit<IEvent, 'id' | 'archived' | 'category'>
// ): Promise<IEvent> => {
//   const category = categorizeEvent(eventData.title, eventData.notes);
//   const newEventData = {
//     archived: false,
//     category,
//     ...eventData,
//   };
//   const result = await Event.create(newEventData);
//   return result;
// };

// const getAllEvents = async (
//   filters: Partial<IEvent>,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IEvent[]>> => {
//   const filterData = filters;

//   const andConditions = [];

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       $and: Object.entries(filterData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const whereCondition =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelper(paginationOptions);

//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const events = await Event.find(whereCondition)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Event.countDocuments(whereCondition);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: events,
//   };
// };

// const updateEventArchivedStatus = async (
//   id: string,
//   archived: boolean
// ): Promise<IEvent> => {
//   const result = await Event.findByIdAndUpdate(id, { archived }, { new: true });

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//   }

//   return result;
// };

// const deleteEvent = async (id: string): Promise<void> => {
//   const result = await Event.findByIdAndDelete(id);
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//   }
//   return result;
// };

// export const EventService = {
//   createEvent,
//   getAllEvents,
//   updateEventArchivedStatus,
//   deleteEvent,
// };

import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IEvent } from './event.interface';
import { categorizeEvent } from './event.utils';

const events: IEvent[] = []; // In-memory storage
let nextId = 1;

const createEvent = async (
  eventData: Omit<IEvent, 'id' | 'archived' | 'category'>
): Promise<IEvent> => {
  const category = categorizeEvent(eventData.title, eventData.notes);
  const newEvent: IEvent = {
    id: nextId.toString(),
    archived: false,
    category,
    ...eventData,
  };
  events.push(newEvent);
  nextId++;
  return newEvent;
};

const getAllEvents = async (
  filters: Partial<IEvent>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEvent[]>> => {
  let filteredEvents = events;

  // Apply filters (match as strings to be safer)
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      filteredEvents = filteredEvents.filter(
        event => String(event[key as keyof IEvent]) === String(value)
      );
    }
  });

  // Convert pagination values to numbers
  const page = Number(paginationOptions.page) || 1;
  const limit = Number(paginationOptions.limit) || 10;
  const skip = (page - 1) * limit;

  const paginatedEvents = filteredEvents.slice(skip, skip + limit);

  return {
    meta: {
      page,
      limit,
      total: filteredEvents.length,
    },
    data: paginatedEvents,
  };
};

const updateEventArchivedStatus = async (
  id: string,
  archived: boolean
): Promise<IEvent> => {
  const event = events.find(e => e.id === id);
  if (!event) {
    throw new Error('Event not found');
  }
  event.archived = archived;
  return event;
};

const deleteEvent = async (id: string): Promise<IEvent> => {
  const index = events.findIndex(e => e.id === id);
  if (index === -1) {
    throw new Error('Event not found');
  }
  const deletedEvent = events[index];
  events.splice(index, 1);
  return deletedEvent;
};

export const EventService = {
  createEvent,
  getAllEvents,
  updateEventArchivedStatus,
  deleteEvent,
};
