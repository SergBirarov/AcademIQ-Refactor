import { CourseType } from './../course/course.model';
import * as Db from './student.db';
//student type
export type StudentType = {
    UserId: number,
    FirstName: string,
    LastName: string,
    School_Year: number,
    Major: string,
    Phone: string,
    Picture_URL?: string,
    Address: string,
    City_Code: number,
    Enrollment: Date
}

export class StudentService {
    static async getStudentById(userId: any) {
        return await Db.getById(userId);
    }

    // static async getAllStudents(){
    //     return await Db.getAllStudents();
    // }

    // static async getActiveCourses(StudentId: number){
    //     return await Db.getActiveCourses(StudentId);
    // }

    // static async assignCourse(StudentId: number, CourseId: number){
    //     return await Db.assignCourse(StudentId, CourseId);
    // }


}