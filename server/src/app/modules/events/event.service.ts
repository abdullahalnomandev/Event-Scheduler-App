import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

const getAllEvents = async (): Promise<IEvent[]> => {
  const result = await Event.find();
  return result;
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
