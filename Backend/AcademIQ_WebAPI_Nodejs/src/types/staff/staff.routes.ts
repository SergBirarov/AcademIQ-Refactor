import { Router} from "express";
import { getStaffById, registerStudent, registerInstructor, assignStudents } from "./staff.controller";
import { authenticateJWT } from "../../utils/helpers";

const staffRouter = Router();

staffRouter.get('/profile',authenticateJWT, getStaffById)
            .post('/register-student', authenticateJWT, registerStudent)
            .post('/register-instructor', authenticateJWT, registerInstructor)
            .post('/assign-student', authenticateJWT, assignStudents)
            // .post('/assign-instructor', authenticateJWT, assignInstructor)
            // .post('create-course', authenticateJWT, createCourse)
            // .post('/update-course', authenticateJWT, updateCourse)
            // .post('/delete-course', authenticateJWT, deleteCourse)
            // .get('/courses', authenticateJWT, getCourses)
            // .get('/instructors', authenticateJWT, getInstructors)
            // .get('/students', authenticateJWT, getStudents)
            // .get('/active-courses', authenticateJWT, getActiveCourses)
            // .get('/student-courses', authenticateJWT, getStudentCourses)
            // .get('/instructor-courses', authenticateJWT, getInstructorCourses)
            // .get('/student-instructors', authenticateJWT, getStudentInstructors);

export default staffRouter;