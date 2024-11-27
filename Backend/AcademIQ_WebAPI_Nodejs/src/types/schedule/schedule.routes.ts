import { Router } from 'express';
import { authenticateJWT } from '../../utils/helpers';
import * as scheduleController from './schedule.controller';

const scheduleRouter = Router();

scheduleRouter.post('/add', authenticateJWT, scheduleController.addSchedule)
    .get('/all', authenticateJWT, scheduleController.getSchedules)
    .put('/update', authenticateJWT, scheduleController.updateSchedule)
    .delete('/delete', authenticateJWT, scheduleController.deleteSchedule);

export default scheduleRouter;
