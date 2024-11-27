import { Router} from "express";
import { StudentController  } from "./student.controller";
import { authenticateJWT } from "../../utils/helpers";


const studentRouter = Router();

studentRouter.get('/profile',authenticateJWT, StudentController.getStudentById)
// get('/all', StudentController.getAllStudents)
            // .post('/register', StudentController.register)
            // .get('/:id/active-courses', StudentController.getStudentActiveCourses)
            // .post('/assign-course', StudentController.assignCourse);

export default studentRouter;

