import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Submission } from './submission.model';
import { getDb } from '../../mongo-db/server';

export const submitAssignment = async (req: Request, res: Response) => {
        const db = getDb();
        const submissionsCollection = db.collection<Submission>('submissions');
    
        const { assignmentId, studentId, fileId } = req.body;
    
        try {
            const submission: Submission = {
                assignmentId,
                studentId,
                submissionDate: new Date(),
                fileId,
            };
    
            const result = await submissionsCollection.insertOne(submission);
    
            if (result.insertedId) {
                res.status(201).json({ message: 'Assignment submitted successfully.' });
            } else {
                res.status(500).json({ error: 'Failed to submit assignment.' });
            }
        } catch (error) {
            console.error("[SUBMISSIONS] Error submitting assignment:", error);
            res.status(500).json({ error: 'An error occurred while submitting the assignment.' });
        }
    }

    // Get Submissions
export const getSubmissions = async (req: Request, res: Response) => {
    const db = getDb();
    const submissionsCollection = db.collection<Submission>('submissions');

    const { studentId, assignmentId } = req.query;

    try {
        const query: Partial<Submission> = {};
        if (studentId) query.studentId = parseInt(studentId as string);
        if (assignmentId) query.assignmentId = parseInt(assignmentId as string);

        const submissions = await submissionsCollection.find(query).toArray();
        res.status(200).json(submissions);
    } catch (error) {
        console.error("[SUBMISSIONS] Error fetching submissions:", error);
        res.status(500).json({ error: 'An error occurred while fetching submissions.' });
    }
};

// Update Submission (typically used for adding grade/feedback)
export const updateSubmission = async (req: Request, res: Response) => {
    const db = getDb();
    const submissionsCollection = db.collection<Submission>('submissions');

    const { submissionId, grade, feedback } = req.body;

    try {
        const updatedFields: Partial<Submission> = {};
        if (grade !== undefined) updatedFields.grade = grade;
        if (feedback) updatedFields.feedback = feedback;
        const objectId = new ObjectId(submissionId as string);
        const result = await submissionsCollection.updateOne(
            { _id: objectId },
            { $set: updatedFields }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Submission not found.' });
        } else {
            res.status(200).json({ message: 'Submission updated successfully.' });
        }
    } catch (error) {
        console.error("[SUBMISSIONS] Error updating submission:", error);
        res.status(500).json({ error: 'An error occurred while updating the submission.' });
    }
};

// Delete Submission
export const deleteSubmission = async (req: Request, res: Response) => {
    const db = getDb();
    const submissionsCollection = db.collection<Submission>('submissions');

    const { submissionId } = req.query;

    try {
        const result = await submissionsCollection.deleteOne({ _id: new ObjectId(submissionId as string) });

        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Submission not found.' });
        } else {
            res.status(200).json({ message: 'Submission deleted successfully.' });
        }
    } catch (error) {
        console.error("[SUBMISSIONS] Error deleting submission:", error);
        res.status(500).json({ error: 'An error occurred while deleting the submission.' });
    }
};