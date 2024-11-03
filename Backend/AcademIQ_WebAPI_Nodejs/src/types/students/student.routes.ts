import { Router} from "express";
import { getAllStudents, getStudentById, register   } from "./student.controller";

const studentRouter = Router();

studentRouter.get('/students', getAllStudents)
            .get('/students/:id', getStudentById)
            .post('/students/register', register);

export default studentRouter;

