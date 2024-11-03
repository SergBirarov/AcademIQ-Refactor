import { Router} from "express";
import { getStaffById } from "./staff.controller";

const staffRouter = Router();

staffRouter.get('/:id', getStaffById);

export default staffRouter;