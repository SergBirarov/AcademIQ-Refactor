import { Router} from "express";
import { getAllStudents, getStudentById, register, getStudentActiveCourses, assignCourse   } from "./student.controller";
import { authenticateJWT } from "../../utils/helpers";


const studentRouter = Router();

studentRouter.get('/', getAllStudents)
            .get('/profile',authenticateJWT, getStudentById)
            .post('/register', register)
            .get('/:id/active-courses', getStudentActiveCourses)
            .post('/assign-course', assignCourse);

export default studentRouter;

