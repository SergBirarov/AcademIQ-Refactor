import { StudentType } from "./student.model";
import Db from "../../utils/db";
import sql from 'mssql';


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
      

  export async function getActiveCoursesForStudent(studentId: number): Promise<any> {
    try {
        const query = `
            SELECT ac.*, co.CourseName, co.StartDate, co.EndDate, i.FirstName as InstructorFirstName, i.LastName as InstructorLastName
            FROM ActiveStudentCourses ac
            JOIN CoursesOnAir co ON ac.CourseId = co.CourseId
            JOIN Instructors i ON co.InstructorId = i.UserId
            WHERE ac.StudentId = @studentId AND (co.EndDate IS NULL OR co.EndDate >= GETDATE());
        `;
        
        const result = await Db.query(query, {
            studentId: { value: studentId, type: sql.Int }
        });
        return result;
    } catch (err) {
        console.error("Error in getActiveCoursesForStudent:", err);
        throw err;
    }
}

export async function assignStudentToCourse(studentId: number, courseId: number): Promise<any> {
  try {
      const params = {
          StudentId: studentId,
          CourseId: courseId,
      };
      const result = await Db.executeStoredProc('AssignStudentToCourse', params);
      return result[0]?.status;
  } catch (err) {
      console.error("Error in assignStudentToCourse function:", err);
      throw err;
  }
}