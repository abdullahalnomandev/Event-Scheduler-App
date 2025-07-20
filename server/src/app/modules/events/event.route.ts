import express from 'express';
import { EventController } from './event.controller';

const router = express.Router();

router.post('/', EventController.createEvent);
router.get('/', EventController.getAllEvents);
router.put('/:id', EventController.updateEventArchivedStatus);
router.delete('/:id', EventController.deleteEvent);

export const EventRoutes = router;
