import  bcrypt  from 'bcrypt';
import { Request, Response } from "express";
import { addUser, UserType, passwordEncryption } from "./user.model";
import Db from "../utils/db";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export async function login(req: Request, res: Response) {
  try {
    let { UserId, PasswordHash } = req.body;
    console.log("(login)userId:", UserId, "password:", PasswordHash);

    // Check if the user exists
    let userResult = await Db.query(`select * from Users where UserId = ${UserId}`);
    const request = Db.pool.request();
    request.input('UserId', UserId);

    console.log("userResult",userResult.recordset[0]);
    if (!userResult ) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.recordset[0];
    console.log("Fetched user:", user);

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(PasswordHash, user.PasswordHash);

    console.log("isMatch:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    console.log("SECRET_KEY:", SECRET_KEY);

    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.UserId, role: user.Role_Code }, SECRET_KEY, { expiresIn: '1h' });
    console.log("Token:", token);

    // Return the user data and token
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
}

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
    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function register(req: Request, res: Response) {
  try {
    let user : UserType = req.body;
    if (user.UserId === undefined || user.UserEmail === undefined || user.PasswordHash === undefined || user.Role_Code === undefined)
      return res.status(400).json({ message: "(register)all fields are required" });

    const userResult = await addUser(user);
      console.log("userResult",userResult);
    if (userResult.message == 'User already exists')
      return res.status(409).json({ message: "user already exists" });

    res.status(201).json({ message: "user created successfully" });
}catch(error){
    res.status(500).json(error);
  } 
}

