import { Router } from 'express';
import { authenticateJWT } from '../../utils/helpers';
import * as eventsController from './event.controller';

const eventsRouter = Router();

eventsRouter.post('/add', authenticateJWT, eventsController.addEvent)
    .get('/all', authenticateJWT, eventsController.getEvents)
    .put('/update', authenticateJWT, eventsController.updateEvent)
    .delete('/delete', authenticateJWT, eventsController.deleteEvent);

export default eventsRouter;