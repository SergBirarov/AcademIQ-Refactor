import express, { Request, Response, NextFunction } from "express";
import userRouter from "./user/user.routes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import studentRouter from "./types/students/student.routes";
import cors from "cors";
import Db from "./utils/db";
import staffRouter from "./types/staff/staff.routes";
import instructorRouter from "./types/instructor/instructor.routes";
import courseOnAirRouter from "./types/coursesOnAir/courseOnAir.routes";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;;
const SECRET_KEY = process.env.SECRET_KEY as string;


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5000",
    
  ],
};

app.use(cors(corsOptions));
app.use(express.json());



app.use('/api/users', userRouter);
app.use('/api/staff', staffRouter);
app.use('/api/students', studentRouter);
app.use('/api/instructors', instructorRouter);
app.use('/api/coursesonair', courseOnAirRouter);

//listen to the defined port
app.listen(PORT, () => {
  console.log(`[SERVER] Server is live http://localhost:${PORT}`);
});
