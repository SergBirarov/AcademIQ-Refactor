import { Router} from "express";
import * as userController from "./user.controller";

//create router
const userRouter = Router();

//defined verbs
userRouter
  .get('/profile', userController.getUserById)
  .post('/register', userController.register)
  .post('/login', userController.login)
  .put('/update', userController.updateUser);

//export
export default userRouter;