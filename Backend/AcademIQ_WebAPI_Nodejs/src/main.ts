import express, { Request, Response, NextFunction } from "express";
import userRouter from "./user/user.routes";
import dotenv from "dotenv";
import cors from "cors";
import Db from "./utils/db";
import staffRouter from "./types/staff/staff.routes";

dotenv.config();
const PORT = process.env.PORT || 3000;;

const app = express();

app.use(cors());
app.use(express.json());

//default GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.get('/api/test-connection', async (req: Request, res: Response) => {
  try {
    const result = await Db.query('SELECT * from Users');
    res.status(200).json({ message: 'Connection successful', result });
  } catch (error) {
    console.error("Connection failed:", error);
    res.status(500).json({ message: 'Connection failed', error });
  }
});

app.use('/api/users', userRouter);
app.use('/api/staff', staffRouter);

//listen to the defined port
app.listen(PORT, () => {
  console.log(`[SERVER] Server is live http://localhost:${PORT}`);
});
