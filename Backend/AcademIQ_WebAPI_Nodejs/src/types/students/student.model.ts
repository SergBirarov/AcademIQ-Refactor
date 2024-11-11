import { saveStudent, getActiveCoursesForStudent as getCoursesFromDb, assignStudentToCourse } from "../students/student.db";

export type StudentType = {
    UserId: number,
    FirstName: string,
    LastName: string,
    School_Year: number,
    Phone: string,
    Picture_URL: string,
    Address: string,
    City_Code: number,
    Enrollment: Date
}

export async function addStudent(student: StudentType): Promise<any> {
  try {
    return await saveStudent(student);
  } catch (error) {
    console.error("Error in addStudent function:", error);
    throw error;
  }
}

export async function getActiveCourses(studentId: number): Promise<any> {
  try {
      return await getCoursesFromDb(studentId);
  } catch (err) {
      console.error("Error in getActiveCourses function:", err);
      throw err;
  }
}

export async function addStudentToCourse(studentId: number, courseId: number): Promise<any> {
  try {
      return await assignStudentToCourse(studentId, courseId);
  } catch (err) {
      console.error("Error in addStudentToCourse function:", err);
      throw err;
  }
}