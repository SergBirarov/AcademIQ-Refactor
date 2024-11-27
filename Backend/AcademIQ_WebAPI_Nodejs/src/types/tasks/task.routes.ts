import { Router } from "express";
import { authenticateJWT } from "../../utils/helpers";
import * as taskController from './task.controller';

const taskRouter = Router();

taskRouter.post('/add', authenticateJWT, taskController.addTask)
            .get('/get-student-tasks', authenticateJWT, taskController.getTasks)
            .put('/update-task', authenticateJWT, taskController.updateTask)
            .delete('/delete-task', authenticateJWT, taskController.deleteTask);


export default taskRouter;