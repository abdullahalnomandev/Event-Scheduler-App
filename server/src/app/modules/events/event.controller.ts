import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { eventFilterableFields } from './event.const';
import { IEvent } from './event.interface';
import { EventService } from './event.service';

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const eventData = req.body;
  const result = await EventService.createEvent(eventData);
  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Event created successfully!',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, eventFilterableFields);
  const patinationOptions = pick(req.query, paginationFields);
  const result = await EventService.getAllEvents(filters, patinationOptions);
  sendResponse<IEvent[]>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Events retrieved successfully!',
    meta: result.meta,
    data: result?.data,
  });
});

const updateEventArchivedStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { archived } = req.body; // receive `archived` status from body

    const result = await EventService.updateEventArchivedStatus(id, archived);

    sendResponse<IEvent>(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'Event archived status updated successfully!',
      data: result,
    });
  }
);

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedEvent = await EventService.deleteEvent(id); // returns event

  sendResponse<typeof deletedEvent>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Event deleted successfully!',
    data: deletedEvent,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  updateEventArchivedStatus,
  deleteEvent,
};
