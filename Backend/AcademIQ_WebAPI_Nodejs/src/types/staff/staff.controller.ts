import { Request, Response } from "express";
import { addStaff, assignStudentsModel, StaffType, getStaffByIdModel as getById } from "./staff.model";
import Db from "../../utils/db";
import { addInstructor, InstructorType } from "../instructor/instructor.model";


// Register staff
export async function registerStaff(req: Request, res: Response) {
  try {
      const staff = req.body;

      // Save staff to database
      const result = await addStaff(staff);
      res.status(201).send(result);

  } catch (error) {
      console.error("Error in registerStaff function:", error);
      return res.status(500).json({ message: "Failed to register staff", error });
  }
}


// // Assign students to course
// export async function assignStudents(req: Request, res: Response) {
//   try {
//       const { studentIds, courseId } = req.body;

//       const result = await assignStudentsModel(studentIds, courseId);
//       res.status(200).json(result);
//   } catch (error) {
//       console.error("Error in assignStudents function:", error);
//       return res.status(500).json({ message: "Failed to assign students", error });
//   }
// }

export async function getStaffById(req: Request, res: Response){
  try{
    const { UserId } = (req as any).user;

    const result = await getById(UserId);
    res.status(200).send(result);

  }catch(error){
    console.error("Error in getStaffById function:", error);
    res.status(500).send("No user found");
  }
}



// export async function adminRegister(req:Request, res: Response){
//   try{
//   const user = req.body;
//   const { Role_Code } = user.Role_Code;

//   let result = null;
//   switch(Role_Code){
//     case 2:
//       result = await adminRegisterInstructor(user);
//     case 3:
//       const resultStu = await adminRegisterStudent(user);
//     default:
//       res.status(500).send("Error identufying user role to register.")
//   }
//   res.status(200).send(result);
// }catch(error){
//   console.error("Error in adminRegister function:", error);
//   res.status(500).send("Failed to register user");
// }
// }
