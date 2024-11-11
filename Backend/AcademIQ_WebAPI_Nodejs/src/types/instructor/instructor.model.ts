import { saveInstructor } from "./instructor.bd";

export type InstructorType = {
    UserId: number;
    FirstName: string;
    LastName: string;
    Phone: string;
    // Email: string;
    Major: string;
    EmploymentStartDate: Date;
    Address: string;
    City_Code: number;
}

export async function addInstructor(instructor: InstructorType): Promise<any> {
    try{
        return await saveInstructor(instructor);
    }catch(err){
        console.error("Error in addInstructor function:", err);
        throw err;
    }
};

