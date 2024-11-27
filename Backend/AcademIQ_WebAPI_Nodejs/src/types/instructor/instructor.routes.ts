import { Router } from "express";
import { getInstructorById, getAllInstructors } from "./instructor.controller";
import { authenticateJWT } from "../../utils/helpers";

const instructorRouter = Router();

instructorRouter.get('/profile/:id',authenticateJWT, getInstructorById)
                // .post('/register',authenticateJWT, register)
                .get('/all',authenticateJWT,getAllInstructors )


export default instructorRouter;