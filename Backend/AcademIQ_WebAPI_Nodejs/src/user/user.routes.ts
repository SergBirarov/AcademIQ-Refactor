import { Router} from "express";
import { getAllUsers, getUserById, register, login } from "./user.controller";

//create router
const userRouter = Router();

//defined verbs
userRouter
  // .get('/', getAllUsers)
  .get('/:id', getUserById)
  .post('/register', register)
  .post('/login', login)

//export
export default userRouter;