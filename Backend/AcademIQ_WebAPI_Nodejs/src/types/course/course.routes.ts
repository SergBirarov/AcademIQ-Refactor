import { Router } from "express";
import { authenticateJWT } from "../../utils/helpers";


const courseRouter = Router();

courseRouter.post('/create', authenticateJWT);
    // .post('/update', authenticateJWT)
    // .post('/delete', authenticateJWT)
    // .get('/courses', authenticateJWT)
    // .get('/instructors', authenticateJWT)
    // .get('/students', authenticateJWT)
    // .get('/active-courses', authenticateJWT)
    // .get('/student-courses', authenticateJWT)
    // .get('/instructor-courses', authenticateJWT)
    // .get('/student-instructors', authenticateJWT);


export default courseRouter;