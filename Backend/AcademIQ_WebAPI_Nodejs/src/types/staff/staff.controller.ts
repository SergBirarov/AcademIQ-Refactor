import { Request, Response } from "express";
import { addStaff, assignStudentsModel, StaffType } from "./staff.model";
import Db from "../../utils/db";
import { addStudent, StudentType } from "../students/student.model";
import { addInstructor, InstructorType } from "../instructor/instructor.model";


//By id - return staff member
export async function getStaffById(req: Request, res: Response) {
    console.log("(getStaffById)");
    try {
        let { UserId } = (req as any).user;
        const result = await Db.query(`select * from Staff where UserId = ${UserId}`);
        
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        
        let profile = result[0];
        console.log("Fetched staff:", profile);

        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json(error);
    }
};

export async function registerStudent(req: Request, res: Response) {
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

export async function registerInstructor(req: Request, res: Response) {
    try{
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

export async function assignStudents(req: Request, res: Response) {
    try{
        const {CourseId, StudentIds} = req.body;
        if(!CourseId || !StudentIds)
          return res.status(400).json({ message: "CourseId and StudentId are required" });

        let StudentIdArray: number[] = Array.isArray(StudentIds)? StudentIds: [StudentIds];
        const result = await assignStudentsModel( StudentIdArray,parseInt(CourseId));

        if (result && result.ErrorMessage) {
            return res.status(500).json({ message: result.ErrorMessage });
        }

        res.status(201).json({ message: "Students assigned to course successfully." });

    }catch (error) {
        console.error("Error in assignStudents controller:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
}



