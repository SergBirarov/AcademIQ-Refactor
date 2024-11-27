import { ObjectId } from 'mongodb';

export interface Exam {
    examId?: ObjectId;
    courseId: number;
    title: string;
    date: Date;
    description?: string;
    fileId?: string; // Reference to the file containing the exam details (optional)
    createdBy: number; // Instructor ID
}

export interface ExamResult {
    resultId?: ObjectId;
    examId: ObjectId;
    studentId: number;
    grade: number;
    feedback?: string;
}
