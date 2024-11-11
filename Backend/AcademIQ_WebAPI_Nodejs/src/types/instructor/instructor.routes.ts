import { Router } from "express";
import { getInstructorById, register } from "./instructor.controller";
import { authenticateJWT } from "../../utils/helpers";

const instructorRouter = Router();

instructorRouter.get('/profile',authenticateJWT, getInstructorById)
                .post('/register', register);


export default instructorRouter;