import * as instructorDb from "./instructor.db";

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
    return await instructorDb.saveInstructor(instructor);
};

export async function getInstructorByIdModel(UserId: number): Promise<any> {
    return await instructorDb.getInstructorByIdDb(UserId);
}

export async function getAllInstructorsModel(): Promise<any> {
    return await instructorDb.getAllInstructorsDb();
}
