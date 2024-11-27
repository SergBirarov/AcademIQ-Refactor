import * as courseDb from './course.db';
export type CourseType = {
CourseId: number;
    CourseName: string;
    ClassRoomRequired: boolean;
    InstructorId: number;
    StartDate?: Date;
    EndDate?: Date;
    ClassRoomCode?: number;
};

export const addCourse = async (courseData: any) => {
  try {
    const result = await courseDb.addCourse(courseData);
    return result.recordset;
  } catch (error) {
    console.error("Error adding course:", error);
    throw new Error("Failed to add course.");
  }
};

export const updateCourse = async (courseData: any) => {
  try {
    const result = await courseDb.updateCourse(courseData.CourseId, courseData);
    return result.recordset;
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Failed to update course.");
  }
};

export const deleteCourse = async (CourseId: number, UserId: number) => {
  try {
    await courseDb.deleteCourse(CourseId);
    return { message: "Course deleted successfully" };
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error("Failed to delete course.");
  }
};

export const getCoursesModel = async (filters: any) => {
  try {
    const result = await courseDb.getCourses(filters);
    console.log("(getAllCourses)result:", result);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses.");
  }
};

// export const getCoursesByUser = async (user: any) => {
//   try {
//     const result = await courseDb.getCoursesByUser(user);
//     console.log("(getAllCourses)result:", result);
//     return result.recordset;
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     throw new Error("Failed to fetch courses.");
//   }
// };

export const assignStudentsToCourse = async (courseId: number, studentIds: number[]) => {
  try {
    const result = await courseDb.assignStudentsToCourse(courseId,studentIds );
    return result.recordset;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses.");
  }
};

export type CreateCourseType = Omit<CourseType, 'CourseId'>;
export type UpdateCourseType = Partial<CourseType>;
