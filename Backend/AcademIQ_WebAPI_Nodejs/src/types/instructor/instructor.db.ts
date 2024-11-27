import { InstructorType} from "./instructor.model";
import Db from "../../utils/db"; 


export async function saveInstructor(instructor: InstructorType): Promise<any> {
    try {
        const result = await Db.storedProc('AddInstructor', instructor);
        console.log("(saveInstructor) result:", result);
        if (!result){
            return { message: 'Instructor already exists' };
        }
        return { message: 'Instructor created successfully' };
    } catch (error) {
        console.error("Error in saveInstructor function:", error); // Log the error
        throw new Error("Failed to save instructor in database");
    }
}

export async function getInstructorByIdDb(UserId: number): Promise<any>{
    try{
    const result = await Db.query('Select * from Instructors where UserId = @UserId',{
        UserId: UserId
    });
    const instructor: InstructorType = result.recordset[0];
    return instructor;
}catch(error){
    console.log("Error in getInstructorById: ", error);
    throw error;
}
}

export async function getAllInstructorsDb(): Promise<any>{
    try{
        const result = await Db.storedProc('GetAllInstructors');
        const instructors: InstructorType[] = result.recordset;
        return instructors;
    }catch(error){
        console.log("Error in getAllInstructors: ", error);
        throw error;
    }
}

