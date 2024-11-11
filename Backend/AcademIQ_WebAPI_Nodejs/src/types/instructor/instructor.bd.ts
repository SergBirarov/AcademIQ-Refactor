import { InstructorType} from "./instructor.model";
import Db from "../../utils/db"; 


export async function saveInstructor(instructor: InstructorType): Promise<any> {
    try {
        const result = await Db.executeStoredProc('AddInstructor', instructor);
        console.log("(saveInstructor) result:", result);
        const status = result[0]?.status;

        if (status === 'Instructor already exists') {
            return { message: 'Instructor already exists' };
        }
        return { message: 'Instructor created successfully' };
    } catch (error) {
        console.error("Error in saveInstructor function:", error); // Log the error
        throw new Error("Failed to save instructor in database");
    }
}

