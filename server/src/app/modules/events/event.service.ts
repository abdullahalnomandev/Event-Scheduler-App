import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IEvent } from './event.interface';
import { Event } from './event.model';
import { categorizeEvent } from './event.utils';

const createEvent = async (
  eventData: Omit<IEvent, 'id' | 'archived' | 'category'>
): Promise<IEvent> => {
  const category = categorizeEvent(eventData.title, eventData.notes);
  const newEventData = {
    archived: false,
    category,
    ...eventData,
  };
  const result = await Event.create(newEventData);
  return result;
};

const getAllEvents = async (
  filters: Partial<IEvent>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEvent[]>> => {
  const filterData = filters;

  const andConditions = [];

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const events = await Event.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: events,
  };
};

const updateEventArchivedStatus = async (
  id: string,
  archived: boolean
): Promise<IEvent> => {
  const result = await Event.findByIdAndUpdate(id, { archived }, { new: true });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return result;
};

const deleteEvent = async (id: string): Promise<void> => {
  const result = await Event.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  return result;
};

export const EventService = {
  createEvent,
  getAllEvents,
  updateEventArchivedStatus,
  deleteEvent,
};
