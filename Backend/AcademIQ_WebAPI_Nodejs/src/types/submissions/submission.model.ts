import { ObjectId } from 'mongodb';


export interface Submission{
    submissionId?: ObjectId;
    assignmentId: number;
    studentId: number;
    submissionDate: Date;
    fileId: string;
    grade?: number;
    feedback?: string;
};

