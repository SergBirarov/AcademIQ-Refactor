import { assignStudentsToCourses, saveStaff } from './staff.db';



export type StaffType = {
    UserId: number,
    FirstName: string, 
    LastName: string,
    Email: string,
    Phone: string,
    City_Code: number
}

export async function addStaff(staff: StaffType): Promise<any> {
    try{
        return await saveStaff(staff, 'sp_AddStaff'); 
    }catch(err){
        console.error("Error in addStaff function:", err);
        throw err;      
    }
};

export async function assignStudentsModel(studentIds: number[], courseId: number): Promise<any> {
    try {

        return await assignStudentsToCourses(studentIds, courseId);
    } catch (err) {
        console.error("Error in assignStudents function:", err);
        throw err;
    }
       
}