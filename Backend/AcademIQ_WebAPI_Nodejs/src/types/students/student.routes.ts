import { Router} from "express";
import { getAllStudents, getStudentById, register   } from "./student.controller";

const studentRouter = Router();

studentRouter.get('/', getAllStudents)
            .get('/:id', getStudentById)
            .post('/register', register);

export default studentRouter;

