import { Router} from "express";
import { getAllUsers, getUserById, register } from "./user.controller";

//create router
const userRouter = Router();

//defined verbs
userRouter
  // .get('/', getAllUsers)
  .get('/:id', getUserById)
  .post('/register', register)

//export
export default userRouter;