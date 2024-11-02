import express, { Request, Response } from "express";
import userRouter from "./user/user.routes";
import dotenv from "dotenv";
import Db from "./utils/db";

dotenv.config();
const PORT = process.env.PORT || 3000;;

const app = express();
app.use(express.json());

//default GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
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

//listen to the defined port
app.listen(PORT, () => {
  console.log(`[SERVER] Server is live http://localhost:${PORT}`);
});
