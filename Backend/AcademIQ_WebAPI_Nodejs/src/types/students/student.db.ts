import { StudentType } from "./student.model";
import Db from "../../utils/db";


export async function saveStudent(student: StudentType): Promise<any> {
    try {
      const result = await Db.executeStoredProc('AddStudent', student);
      console.log("(saveStudent) result:", result);
      const status = result[0]?.status;
  
      if (status === 'Student already exists')
        {
        return { message: 'Student already exists' };
        }
      return {message: 'Student created successfully'};
    } catch (error) {
      console.error("Error in saveStudent function:", error); // Log the error
      throw new Error("Failed to save student in database");
    }
  }
      