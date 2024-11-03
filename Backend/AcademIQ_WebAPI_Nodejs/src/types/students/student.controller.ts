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
    try {
        let student : StudentType = req.body;
        if (student === undefined)
          return res.status(400).json({ message: "(register)all fields are required" });

        const result = await addStudent(student);

        if (result.message == 'Student already exists')
          return res.status(409).json({ message: "student already exists" });
        res.status(201).json({ message: "student created successfully" });
}
catch(error){
    res.status(500).json(error);
}
    }