import Db from "../../utils/db";
import sql from "mssql";



// Add a new course and update CoursesOnAir if active
export async function addCourse(courseDetails: any): Promise<any> {
  try {
      const result = await Db.storedProc('AddCourse', courseDetails);
      return result;
  } catch (err) {
      console.error("Error in addCourse function:", err);
      throw err;
  }
}

// Update an existing course
export async function updateCourse(courseId: number, updateDetails: any): Promise<any> {
  try {
      const result = await Db.storedProc('UpdateCourse', { courseId, ...updateDetails });
      return result;
  } catch (err) {
      console.error("Error in updateCourse function:", err);
      throw err;
  }
}

// Delete a course and clean related tables
export async function deleteCourse(courseId: number): Promise<void> {
  try {
      await Db.storedProc('DeleteCourse', { courseId });
  } catch (err) {
      console.error("Error in deleteCourse function:", err);
      throw err;
  }
}

// Get courses with optional filters
export async function getCourses(filters: any): Promise<any> {
  try {
      const params = {
          UserId: filters.UserId || null,
          UserRole: filters.UserType || null,
          Active: filters.active || null,
          ClassRoomRequired: filters.classRoomRequired || null,
      };
      console.log("(getCourses)params:", params);
      const result = await Db.storedProc('GetCourses', params);
      console.log("(getCourses)result:", result);
      return result;
  } catch (err) {
      console.error("Error in getCourses function:", err);
      throw err;
  }
}

export async function getCoursesByUser(user: any): Promise<any> {
  try {
      const params = {
          UserId: user.UserId ,
          UserType: user.UserType,
      };
      console.log("(getCourses)params:", params);
      const result = await Db.storedProc('GetActiveCoursesByUser', params);
      console.log("(getCourses)result:", result);
      return result;
  } catch (err) {
      console.error("Error in getCourses function:", err);
      throw err;
  }
}

// Assign multiple students to a course
export async function assignStudentsToCourse(courseId: number, studentIds: number[]): Promise<any> {
  try {
      const studentIdTable = new sql.Table();
      studentIdTable.columns.add('StudentId', sql.Int);
      studentIds.forEach(studentId => studentIdTable.rows.add(studentId));
      
      const params = {
          CourseId: courseId,
          StudentIds: studentIdTable
      };

      const result = await Db.storedProc('AssignStudentsToCourse', params);
      return result.recordset;
  } catch (err) {
      console.error("Error in assignStudentsToCourse:", err);
      throw err;
  }
}
















// export const addCourse = async (params: {
//   CourseId: number;
//   CourseName: string;
//   ClassRoomRequired: boolean;
//   InstructorId: number;
//   StartDate: string;
//   EndDate?: string;
//   ClassRoomCode?: number;
//   UserId: number;
//   IPAddress?: string;
//   UserAgent?: string;
// }) => {
//   return Db.storedProc('AddCourse', params);
// };

// export const updateCourse = async (params: {
//   CourseId: number;
//   CourseName?: string;
//   InstructorId?: number;
//   EndDate?: string;
//   UserId: number;
//   IPAddress?: string;
//   UserAgent?: string;
// }) => {
//   return Db.storedProc('UpdateCourse', params);
// };

// export const deleteCourse = async (courseId: number, userId: number) => {
//   return Db.storedProc('DeleteCourse', { CourseId: courseId, UserId: userId });
// };

// export const getAllCourses = async () => {
//   return Db.storedProc('GetAllCourses');
// };




// export const createCourse = async (course: CreateCourseType): Promise<CourseType> => {
//     const query = `
//         INSERT INTO Courses (CourseName, ClassRoomRequired, InstructorId, StartDate, EndDate, ClassRoomCode)
//         OUTPUT INSERTED.*
//         VALUES (@CourseName, @ClassRoomRequired, @InstructorId, @StartDate, @EndDate, @ClassRoomCode)
//     `;
//     const params = {
//         CourseName: course.CourseName,
//         ClassRoomRequired: course.ClassRoomRequired,
//         InstructorId: course.InstructorId,
//         StartDate: course.StartDate,
//         EndDate: course.EndDate,
//         ClassRoomCode: course.ClassRoomCode,
//     };
//     return await Db.executeParameterizedQuery(query, params);
// };

// export const updateCourse = async (courseId: number, updates: UpdateCourseType): Promise<CourseType> => {
//     const updateFields = Object.entries(updates)
//         .map(([key]) => `[${key}] = @${key}`)
//         .join(", ");
//     const query = `
//         UPDATE Courses SET ${updateFields}
//         OUTPUT INSERTED.*
//         WHERE CourseId = @CourseId
//     `;
//     const params = { CourseId: courseId, ...updates };
//     return await Db.executeParameterizedQuery(query, params);
// };

// export const deleteCourse = async (courseId: number): Promise<void> => {
//     const query = `DELETE FROM Courses WHERE CourseId = @CourseId`;
//     const params = { CourseId: courseId };
//     await Db.executeParameterizedQuery(query, params);
// };
