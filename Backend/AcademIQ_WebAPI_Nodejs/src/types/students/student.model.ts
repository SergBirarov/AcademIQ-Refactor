import { saveStudent } from "../students/student.db";

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