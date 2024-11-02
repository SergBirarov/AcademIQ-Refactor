import { saveStaff } from './staff.db';


export type StaffType = {
    UserId: number,
    FirstName: string, 
    LastName: string,
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