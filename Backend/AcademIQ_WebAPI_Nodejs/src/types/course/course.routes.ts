import { Router } from "express";
import { authenticateJWT } from "../../utils/helpers";
import * as courseController from './course.controller';


const courseRouter = Router();

courseRouter.post('/add', authenticateJWT, courseController.addCourse)
    .get('/course-information', authenticateJWT, courseController.getCourses)
    .delete('/delete/:courseId', authenticateJWT, courseController.deleteCourse)
    .put('/assign-students/:courseId', authenticateJWT, courseController.assignStudents)


export default courseRouter;