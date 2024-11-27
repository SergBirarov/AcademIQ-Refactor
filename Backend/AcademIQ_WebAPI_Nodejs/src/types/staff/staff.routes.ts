import { Router} from "express";
import { getStaffById, registerStaff } from "./staff.controller";
import { authenticateJWT } from "../../utils/helpers";

const staffRouter = Router();

staffRouter.get('/profile',authenticateJWT, getStaffById)
            .post('/register', authenticateJWT, registerStaff)
            // .post('/assign-students', authenticateJWT, assignStudents)


export default staffRouter;