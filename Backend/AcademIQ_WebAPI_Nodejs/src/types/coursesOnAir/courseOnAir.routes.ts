// courseOnAir.routes.ts
import { Router } from "express";
import { authenticateJWT } from "../../utils/helpers";
import { addCourse, getCoursesOnAir, updateCourseOnAir, assignStudentsToCourse ,getActiveCoursesForStudent} from "./courseOnAir.controller";

const courseOnAirRouter = Router();

courseOnAirRouter.post('/add', addCourse)
    .get('/details', getCoursesOnAir)
    .put('/update/:courseId', updateCourseOnAir)
    .put('/assign-students/:courseId', assignStudentsToCourse)
    .get('/student-courses',authenticateJWT, getActiveCoursesForStudent);

export default courseOnAirRouter;
