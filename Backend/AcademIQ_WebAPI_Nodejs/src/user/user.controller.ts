import { Request, Response } from "express";
import { addUser } from "./user.model";
import { addStaff } from "../types/staff/staff.model";
import Db from "../utils/db";

export async function getAllUsers(req: Request, res: Response) {
  try {
    res.send("hello from users");
  } catch (error) {
    res.status(500).json(error);
  }

}

export async function getUserById(req: Request, res: Response) {
  try {
    let { id } = req.params;
    const result = await Db.query(`select * from Users where UserId = ${id}`);
    res.send(`hello to user ${id}`);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const {
      UserId,
      UserEmail,
      PasswordHash,
      Role_Code,
 } = req.body;
 console.log(UserId, UserEmail, PasswordHash, Role_Code);
    if (!UserId || !UserEmail || !PasswordHash)
      return res.status(400).json({ message: "(register)all fields are required" });

    const userResult = await addUser({
      UserId,
      UserEmail,
      PasswordHash,
      Role_Code });
      console.log("userResult",userResult);
    if (!userResult)
      return res.status(500).json({ message: "user creation failed" });
}catch(error){
    res.status(500).json(error);
  } 
}

