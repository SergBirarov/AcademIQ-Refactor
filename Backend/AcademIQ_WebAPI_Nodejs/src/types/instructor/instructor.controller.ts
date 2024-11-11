import { Request, Response } from "express";
import Db from "../../utils/db";
import { addInstructor, InstructorType } from "./instructor.model";


export async function getInstructorById(req: Request, res: Response) {
    try {
        let { id } = req.params;
        const result = await Db.query(`select * from Staff where UserId = ${id}`);
        res.send(JSON.stringify(result));
    } catch (error) {   
        res.status(500).json(error);
    }
}   

export async function register(req: Request, res: Response) {
    try {
      let {
        UserId,
        FirstName,
        LastName,
        Phone,
        Major,
        EmploymentStartDate,
        Address,
        City_Code
      } = req.body;
      if (FirstName === undefined || LastName === undefined || Phone === undefined || Major === undefined || EmploymentStartDate === undefined || Address === undefined || City_Code === undefined)
        return res.status(400).json({ message: "(register)all fields are required" });
  
      const instructor : InstructorType = {
        UserId,
        FirstName,
        LastName,
        Phone,
        Major,
        EmploymentStartDate,
        Address,
        City_Code
      };
      const instructorResult = await addInstructor(instructor);
        console.log("userResult",instructorResult);
      if (instructorResult.message == 'User already exists')
        return res.status(409).json({ message: "user already exists" });
  
      res.status(201).json({ message: "user created successfully" });
  }catch(error){
      res.status(500).json(error);
    } 
  }


  /**
   * {
   *    "UserId": 1111,
   *    "FirstName": "John",
   *    "LastName": "Doe",
   *    "Phone": "555-555-5555",
   *    "Email": "jdoe@ex.com",
   *    "Major": "Computer Science",
   *    "EmploymentStartDate": "2022-01-01",
   *    "Address": "123 Main St",
   *    "City_Code": 1
   * }
   * 
   * {
   *    "UserId": 2222,
   *    "UserEmail": "instructor.example.com",
   *    "PasswordHash": "123456",
   *    "Role_Code": 2
   * }
   *
   */