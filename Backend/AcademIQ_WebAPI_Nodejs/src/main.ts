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
import courseRouter from "./types/course/course.routes";
import taskRouter from './types/tasks/task.routes'
import assignmentRouter from "./types/assignments/assignment.routes";
import fileRouter from './types/file-system/file.routes'
import scheduleRouter from "./types/schedule/schedule.routes";
import eventsRouter from "./types/events/event.routes";
import submissionRouter from "./types/submissions/submission.routes";
import { connectToServer } from "./mongo-db/server";

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
app.use('/api/courses', courseRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/assignments',assignmentRouter );
app.use('/api/files', fileRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/events', eventsRouter);
app.use('/api/submissions', submissionRouter);


(async () => {
  try {
    await connectToServer();
    app.listen(PORT, () => {
      console.log(`[SERVER] Server is live at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[SERVER] Failed to start server:", error);
  }
})();

// connectToServer(() => {
//   app.listen(PORT, () => {
//     console.log(`[SERVER] Server is live http://localhost:${PORT}`);
//   })
// })

//listen to the defined port
// app.listen(PORT, () => {
//   console.log(`[SERVER] Server is live http://localhost:${PORT}`);
// });
