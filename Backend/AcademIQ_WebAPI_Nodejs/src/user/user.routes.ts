import { Router} from "express";
import {  getUserById, register, login } from "./user.controller";
import { authenticateJWT } from "../utils/helpers";

//create router
const userRouter = Router();

//defined verbs
userRouter
  .get('/profile',authenticateJWT, getUserById)
  .post('/register', register)
  .post('/login', login)

//export
export default userRouter;