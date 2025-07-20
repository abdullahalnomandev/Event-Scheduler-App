import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EventController } from './event.controller';
import { EventValidation } from './event.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(EventValidation.createEventZodSchema),
  EventController.createEvent
);
router.get('/', EventController.getAllEvents);
router.put('/:id', EventController.updateEventArchivedStatus);
router.delete('/:id', EventController.deleteEvent);

export const EventRoutes = router;
