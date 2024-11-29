import { Router } from "express";
import { authenticateJWT } from "../../utils/helpers";
import * as assignmentController from './assignment.controller';

const assignmentRouter = Router();

assignmentRouter.post('/add', authenticateJWT, assignmentController.addAssignment)
    .get('/get-student-assignments', authenticateJWT, assignmentController.getAssignments)
    .put('/update-assignment', authenticateJWT, assignmentController.updateAssignment)
    .delete('/delete-assignment', authenticateJWT, assignmentController.deleteAssignment);


export default assignmentRouter;