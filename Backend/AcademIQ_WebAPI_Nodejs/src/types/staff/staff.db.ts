import { StaffType } from "./staff.model";
import Db from "../../utils/db";



/**
 * Saves a staff member to the database.
 *
 * @param {StaffType} staff - The user object to save.
 * @param {string} procName - The stored procedure name.
 * @return {Promise<any>} The result of the database operation.
 */

export async function saveStaff(staff: StaffType, procName: string): Promise<any> {
    try{
        const result = await Db.executeStoredProc(procName, staff);
        const status = result[0]?.status;

        if(status === 'Staff already exists')
            return { message: 'Staff already exists' };
        return {message: 'Staff Member created successfully'};
    }catch(err){
        console.error("Error in saveStaff function:", err);
        throw err;
    }
}