import { addCourse, getCoursesOnAirDetails, getActiveCoursesForStudent, updateCourseOnAir,assignStudentsToCourse } from "./coursesOnAir.db";

export type CourseDetailsType = {
    CourseId: number,
    CourseName: string,
    ClassRoomRequired: boolean,
    InstructorId: number,
    StartDate: Date,
    EndDate?: Date,
    ClassRoomCode?: number
};

export async function addCourseModel(courseDetails: CourseDetailsType): Promise<any> {
    try {
        return await addCourse(courseDetails);
    } catch (err) {
        console.error("Error in addCourseModel function:", err);
        throw err;
    }
}

// Get detailed information about courses on air
export async function getCoursesOnAirModel(): Promise<any> {
    try {
        return await getCoursesOnAirDetails();
    } catch (err) {
        console.error("Error in getCoursesOnAirModel function:", err);
        throw err;
    }
}

// Update a specific course on air
export async function updateCourseOnAirModel(courseId: number, updateDetails: any): Promise<any> {
    try {
        return await updateCourseOnAir(courseId, updateDetails);
    } catch (err) {
        console.error("Error in updateCourseOnAirModel function:", err);
        throw err;
    }
}

export async function assignStudentsToCourseModel(courseId: number, studentIds: number[]): Promise<any> {
    try {
        return await assignStudentsToCourse(courseId, studentIds);
    } catch (err) {
        console.error("Error in assignStudentsToCourseModel function:", err);
        throw err;
    }
}


export async function getActiveCoursesForStudentModel(studentId: number): Promise<any> {
    try {
        return await getActiveCoursesForStudent(studentId);
    } catch (err) {
        console.error("Error in getActiveCoursesForStudentModel function:", err);
        throw err;
    }
}