import * as Db from  './staff.db';

export type StaffType = {
    UserId: number,
    FirstName: string, 
    LastName: string,
    Email: string,
    Phone: string,
    City_Code: number
}

export async function addStaff(staff: StaffType): Promise<any> {
    return await Db.saveStaff(staff);
};

export async function assignStudentsModel(studentIds: number[], courseId: number): Promise<any> {
    return await Db.assignStudentsToCourses(studentIds, courseId);
       
}

export async function getStaffByIdModel(UserId: number): Promise<any> {
    return await Db.getStaffById(UserId);
}