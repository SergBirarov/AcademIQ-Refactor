import { Request, Response } from "express";
import { addStudent, StudentType } from "./student.model";
import Db from "../../utils/db";

export async function getAllStudents(req: Request, res: Response){
    try{
        const result = await Db.query('Select * from Students');
        res.send(result);

    }catch(error){
        res.status(500).json(error);
    }
}

export async function getStudentById(req: Request, res: Response){
    try{
        let { id } = req.params;
        const result = await Db.query(`Select 1 from Students where UserId = ${id}`);
        res.send(result);
    }catch(error){
        res.status(500).json(error);
    }
}


export async function register(req: Request, res: Response) {
    console.log("(register)");
    try {
        let {UserId, FirstName, LastName, School_Year, Phone, Picture_URL, Address, City_Code, Enrollment} = req.body;
        if (UserId === undefined || FirstName === undefined || LastName === undefined || School_Year === undefined || Phone === undefined || Picture_URL === undefined || Address === undefined || City_Code === undefined || Enrollment === undefined)
          return res.status(400).json({ message: "(register)all fields are required" });

        const student : StudentType = {UserId, FirstName, LastName, School_Year, Phone, Picture_URL, Address, City_Code, Enrollment};
        const result = await addStudent(student);

        if (result.message == 'Student already exists')
          return res.status(409).json({ message: "student already exists" });
        res.status(201).json({ message: "student created successfully" });
}
catch(error){
    res.status(500).json(error);
}
    }