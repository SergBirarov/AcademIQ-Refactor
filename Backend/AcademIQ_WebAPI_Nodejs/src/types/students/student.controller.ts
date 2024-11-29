import { Request, Response } from "express";
import { StudentService, StudentType } from "./student.model";
import db from "../../utils/db";
import { IRecordSet } from "mssql";



export class StudentController {

    static async getAllStudents(req: Request, res: Response) {
        try {
            const result = await db.query('SELECT * FROM Students');
            console.log(result.recordsets);
            const students = (result.recordsets as IRecordSet<any>[])[0];    
            res.status(200).json( students);
        } catch (error) {
            console.error("Error fetching students:", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    static async getStudentById(req: Request, res: Response) {
        try {
            const { UserId } = (req as any).user;
            const student = await StudentService.getStudentById(UserId);

            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }

            res.status(200).json(student);
        } catch (error) {
            console.error("Error fetching student:", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    // static async register(req: Request, res: Response) {
    //     try {
    //         const studentData = req.body;
    //         const result =  await StudentService.addStudent(studentData);

    //         res.status(201).json({ message: "Student created successfully" });
    //     } catch (error) {
    //         console.error("Error registering student:", error);
    //         res.status(500).json({ message: "Internal server error", error });
    //     }
    // }

    // static async getStudentActiveCourses(req: Request, res: Response) {
    //     try {
    //         const studentId = parseInt(req.params.id);
    //         const courses = await StudentService.getActiveCourses(studentId);
            
    //         if(!courses.length){
    //             return res.status(404).json({ message: "No Active courses found."});
    //         }

    //         res.status(200).json(courses);
    //     } catch (error) {
    //         console.error("Error fetching courses:", error);
    //         res.status(500).json({ message: "Failed to fetch courses.", error });
    //     }
    // }

    // static async assignCourse(req: Request, res: Response) {
    //     try {
    //         const { studentId, courseId } = req.body;

    //         if (!studentId || !courseId) {
    //             return res.status(400).json({ message: "StudentId and CourseId are required" });
    //         }

    //         const result = await StudentService.assignCourse(studentId, courseId);
            
    //         res.status(201).json({ message: "Student assigned to course successfully" });
    //     } catch (error) {
    //         console.error("Error assigning course:", error);
    //         res.status(500).json({ message: "Failed to assign course.", error });
    //     }
    // }
}

