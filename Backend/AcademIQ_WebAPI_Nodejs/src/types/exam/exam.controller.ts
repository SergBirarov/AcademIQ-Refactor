import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Exam, ExamResult } from './exam.model';
import { getDb } from '../../mongo-db/server';

// Add Exam
export const addExam = async (req: Request, res: Response) => {
    const db = getDb();
    const examsCollection = db.collection<Exam>('exams');

    const { courseId, title, date, description, fileId, createdBy } = req.body;

    try {
        const exam: Exam = {
            courseId,
            title,
            date: new Date(date),
            description,
            fileId,
            createdBy,
        };

        const result = await examsCollection.insertOne(exam);

        if (result.insertedId) {
            res.status(201).json({ message: 'Exam created successfully.', examId: result.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create exam.' });
        }
    } catch (error) {
        console.error("[EXAMS] Error adding exam:", error);
        res.status(500).json({ error: 'An error occurred while creating the exam.' });
    }
};

// Get Exams
export const getExams = async (req: Request, res: Response) => {
    const db = getDb();
    const examsCollection = db.collection<Exam>('exams');

    const { courseId } = req.query;

    try {
        const query: Partial<Exam> = {};
        if (courseId) query.courseId = parseInt(courseId as string);

        const exams = await examsCollection.find(query).toArray();
        res.status(200).json(exams);
    } catch (error) {
        console.error("[EXAMS] Error fetching exams:", error);
        res.status(500).json({ error: 'An error occurred while fetching exams.' });
    }
};

// Add Exam Result
export const addExamResult = async (req: Request, res: Response) => {
    const db = getDb();
    const examResultsCollection = db.collection<ExamResult>('examResults');

    const { examId, studentId, grade, feedback } = req.body;

    try {
        const examResult: ExamResult = {
            examId,
            studentId,
            grade,
            feedback
        };

        const result = await examResultsCollection.insertOne(examResult);

        if (result.insertedId) {
            res.status(201).json({ message: 'Exam result added successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to add exam result.' });
        }
    } catch (error) {
        console.error("[EXAM RESULTS] Error adding exam result:", error);
        res.status(500).json({ error: 'An error occurred while adding the exam result.' });
    }
};

// Update Exam Result
export const updateExamResult = async (req: Request, res: Response) => {
    const db = getDb();
    const examResultsCollection = db.collection<ExamResult>('examResults');

    const { resultId, grade, feedback } = req.body;

    try {
        const updatedFields: Partial<ExamResult> = {};
        if (grade !== undefined) updatedFields.grade = grade;
        if (feedback) updatedFields.feedback = feedback;

        const objectId = new ObjectId(resultId as string);
        const result = await examResultsCollection.updateOne(
            { _id: objectId },
            { $set: updatedFields }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Exam result not found.' });
        } else {
            res.status(200).json({ message: 'Exam result updated successfully.' });
        }
    } catch (error) {
        console.error("[EXAM RESULTS] Error updating exam result:", error);
        res.status(500).json({ error: 'An error occurred while updating the exam result.' });
    }
};
