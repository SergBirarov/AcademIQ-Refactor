import  bcrypt  from 'bcrypt';
import {  Request, Response } from "express";
import * as userModel from "./user.model";
import { generateToken, authenticateJWT} from "../utils/helpers";
import Db from "../utils/db";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();



export async function login(req: Request, res: Response) {

  const {  UserId, PasswordHash } = req.body;
  console.log("User login attempt:", UserId, PasswordHash);

  try {
    const user = await userModel.getUserById(UserId);
    if (!user) {
      return res.status(401).send('Username or password incorrect');
    }
    
    const isMatch = await bcrypt.compare(PasswordHash, user.PasswordHash);
    if (!isMatch) {
      return res.status(401).send('Username or password incorrect');
    }

    const token = generateToken({UserId: user.UserId, Role_Code: user.Role_Code});

    let role = user.Role_Code;
    if(role === 1){
      role = "Staff"
    }
    else if(role === 2){
      role = "Instructor"
    }
    else if(role === 3){
      role = "Student"
    }
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        Id: user.UserId,
        Email: user.UserEmail,
        Role: role,
        Name: user.FirstName + ' ' + user.LastName,
        Phone: user.Phone || null,
        Address: user.Address || null,
        City: user.City || null,
        //for 
        Picture_URL: user.Picture_URL || null,
        School_Year: user.School_Year || null,
        Major: user.Major || null,
        Enrollment: user.Enrollment || null,
        //for instructor
        EmploymentStartDate: user.EmploymentStartDate || null,
      }, role
    });
    
    console.log("User login successful", token);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Login failed', error });
  }
}



// Register a new user
export async function register(req: Request, res: Response) {
  try {
    let userData: userModel.UserType = req.body;
    userData.PasswordHash = await bcrypt.hash(userData.PasswordHash, 10);

    if (userData.UserId === undefined || userData.UserEmail === undefined || userData.PasswordHash === undefined || userData.Role_Code === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userResult = await userModel.addUser(userData);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: 'Registration failed', error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userData = req.body;
    const result = await userModel.updateUser(userData);
    res.status(200).send(result);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).send("Failed to update user");
  }
}
// Get user by ID (after being authenticated)
export async function getUserById(req: Request, res: Response) {
  try {
    const {userId} = (req as any).user.UserId;

    // Retrieve user by ID
    const result = await userModel.getUserById(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Failed to get user profile", error });
  }
}

