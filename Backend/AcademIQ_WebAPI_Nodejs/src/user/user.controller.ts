import  bcrypt  from 'bcrypt';
import {  Request, Response } from "express";
import { addUser, UserType, passwordEncryption } from "./user.model";
import { generateToken, authenticateJWT} from "../utils/helpers";
import Db from "../utils/db";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();



export async function login(req: Request, res: Response) {
  const {  UserId, PasswordHash } = req.body;
  console.log(UserId, PasswordHash);
  try {

    let userResult = await Db.query(`select * from Users where UserId = @UserId`, {
      UserId: { value: UserId, type: sql.Int }
    });

    const request = Db.pool.request();
    request.input('UserId', UserId);

    const userRes = userResult[0];

    const isMatch = await bcrypt.compare(PasswordHash, userRes.PasswordHash);

    console.log("userRes",userRes);

    if(userRes && isMatch){
    const token = generateToken({UserId: userRes.UserId, Role_Code: userRes.Role_Code});
    res.status(200).json({
      authToken: token,
      id: userRes.UserId,
        role: userRes.Role_Code
      })
      console.log("user login done",token);
    } else{
      res.status(401).send('Username or password incorrect');
    }

    // let additionalUserData = {};
    // if (userRes.Role_Code === 3) {
    //   // Student
    //   const studentResult = await Db.query(`SELECT * FROM Students WHERE UserId = @UserId`, {
    //     UserId: { value: UserId, type: sql.Int }
    //   });

    //   if (studentResult && studentResult.length > 0) {
    //     additionalUserData = studentResult[0];
    //   }
    // } else if (userRes.Role_Code === 2) {
    //   // Staff
    //   const staffResult = await Db.query(`SELECT * FROM Staff WHERE UserId = @UserId`, {
    //     UserId: { value: UserId, type: sql.Int }
    //   });

    //   if (staffResult && staffResult.length > 0) {
    //     additionalUserData = staffResult[0];
    //   }
    // }

    // // Merge base user data with role-specific data
    // const user = {
    //   ...userRes,
    //   ...additionalUserData,
    // };

    // const SECRET_KEY = process.env.SECRET_KEY;

    // if (!SECRET_KEY) {
    //   throw new Error("SECRET_KEY is not defined");
    // }

    // // Generate a JWT token
    // const token = jwt.sign({ userId: user.UserId, role: user.Role_Code }, SECRET_KEY, { expiresIn: '1h' });

    // // Return the user data and token
    // res.status(200).json({ token, user });
    // console.log("(login)fullUserData:", user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Login failed', error });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = (req as any).user.UserId;
    
    const result = await Db.query(`select * from Users where UserId = ${userId}`, {
      UserId: { value: userId, type: sql.Int }});
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error in getProfile:", error);
      res.status(500).json({ message: "Failed to get user profile", error });
    }
}

// {
//   "UserId": 3333,
//   "PasswordHash": "123456",
//   "UserEmail": "student3@ex.com",
//   "Role_Code": 3
// }

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

