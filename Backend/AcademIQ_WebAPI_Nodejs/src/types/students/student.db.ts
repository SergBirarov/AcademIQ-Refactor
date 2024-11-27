import { StudentType } from "./student.model";
import Db from "../../utils/db";
import sql from 'mssql';



export async function getStudentById(userId: number){
    return await Db.storedProc('GetUserById', {UserId: userId, Role_Code: 2})
}

// export async function getActiveCourses(StudentId: number){
//     return await Db.storedProc('GetActiveCoursesByUser', {UserId: StudentId, UserType:'Student'})
// }

export const getById = async(params:{UserId: number}) =>{
    return Db.storedProc('')
}

