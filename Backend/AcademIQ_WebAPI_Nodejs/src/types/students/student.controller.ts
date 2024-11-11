import { Request, Response } from "express";
import { addStudent, StudentType, getActiveCourses as getCourses, addStudentToCourse  } from "./student.model";
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
    console.log("(getStudentById)");
    try {
        let { UserId } = (req as any).user;
    
        console.log(`(getStudentById)id: SELECT * FROM Students WHERE UserId = ${UserId}`);
        const result = await Db.query(`SELECT * FROM Students WHERE UserId = ${UserId}`);
    
        if (result) {
          let profile = result[0];
          console.log("Fetched student:", profile);
          res.status(200).json(profile);
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
}

// {
//   "UserId": 3333,
//   "FirstName": "Student",
//   "LastName": "NumberThreee",
//   "School_Year": 1,
//   "Phone": "3333-333",
//   "Picture_URL": "https://academiq-assets.s3.eu-north-1.amazonaws.com/user-pic.jpg",
//   "Address": "12 Street 3",
//   "City_Code": 3,
//   "Enrollment": "2023-10-20"
// }


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


    export async function getStudentActiveCourses(req: Request, res: Response) {
      try {
          const studentId = parseInt(req.params.studentId);
          
          if (!studentId) {
              return res.status(400).json({ message: "StudentId is required" });
          }
  
          const courses = await getCourses(studentId);
          res.status(200).json(courses);
      } catch (error) {
          res.status(500).json({ message: "Internal server error", error });
      }
  }



export async function assignCourse(req: Request, res: Response) {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ message: "StudentId and CourseId are required" });
        }

        const result = await addStudentToCourse(studentId, courseId);

        if (result === 'Student is already assigned to the course') {
            return res.status(409).json({ message: "Student already assigned to this course" });
        }

        res.status(201).json({ message: "Student assigned to course successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
