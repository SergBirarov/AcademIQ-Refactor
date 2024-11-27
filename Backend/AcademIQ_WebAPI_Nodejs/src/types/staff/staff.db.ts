import { StaffType } from "./staff.model";
import Db from "../../utils/db";
import sql from 'mssql';


export async function saveStaff(staff: StaffType): Promise<any> {
    return Db.storedProc('AddStaff', staff);
}

export async function assignStudentsToCourses(studentIds: number[], courseId: number): Promise<any> {
    const studentTable = new sql.Table(); 
    studentTable.columns.add('StudentId', sql.Int);
    studentIds.forEach(studentId => {
        studentTable.rows.add(studentId);
    });

    // Execute the stored procedure with the TVP parameter
    return Db.storedProc('AssignStudentsToCourse', {
        CourseId: courseId,
        StudentIds: { value: studentTable, type: sql.TVP }
    });   
}

export async function getStaffById(UserId: number): Promise<any>{
    return Db.storedProc('GetStaffById', {UserId: UserId});

}
