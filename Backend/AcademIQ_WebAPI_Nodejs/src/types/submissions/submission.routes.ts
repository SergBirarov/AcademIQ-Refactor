import { Router } from "express";
import { authenticateJWT } from "../../utils/helpers";
import * as submisiionController from './submission.controller';

const submissionRouter = Router();

submissionRouter.post('/submit', authenticateJWT, submisiionController.submitAssignment)
    .get('/get-submissions', authenticateJWT, submisiionController.getSubmissions)
    .put('/update-submission', authenticateJWT, submisiionController.updateSubmission)
    .delete('/delete-submission', authenticateJWT, submisiionController.deleteSubmission);


export default submissionRouter;