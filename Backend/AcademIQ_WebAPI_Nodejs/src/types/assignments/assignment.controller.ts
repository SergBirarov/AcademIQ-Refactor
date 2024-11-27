// import { Assignment } from './assignment.controller';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
// import * as assignmentModel from './assignment.model';
import { getDb } from '../../mongo-db/server';

dotenv.config();

export interface Assignment {
    assignmentId?: ObjectId;
    courseId: number;
    assignmentNumber: number;
    title: string;
    description: string;
    dueDate: Date;
    createdBy: number;
    isVisible: boolean;
    isCompleted?: boolean;
    attachments?: string[];
}

export const addAssignment = async (req: Request, res: Response) => {
        const db = getDb();
        const assignmentsCollection = db.collection<Assignment>('assignments');

        const { title, assignmentNumber, description, dueDate, courseId, createdBy, fileId, isVisible, isCompleted} = req.body;

        try{
            const assignment: Assignment = {
                title,
                description,
                dueDate: new Date(dueDate),
                courseId,
                assignmentNumber,
                createdBy,
                isVisible,
                isCompleted,
                attachments: fileId? [fileId] : []
            }

            await assignmentsCollection.insertOne(assignment);
            res.status(201).json({ message: 'Assignment created succesfully.', assignment});

        } catch (error) {
            console.error("[ASSIGNMENTS] Error creating assignment:", error);
            res.status(500).json({ error: 'An error occurred while creating the assignment' });
          }
        }



// Get Assignments Controller
export const getAssignments = async (req: Request, res: Response) => {
    const db = getDb();
    const assignmentsCollection = db.collection<Assignment>('assignments');
  
    const { courseId, studentId } = req.query;
    console.log("getAssignments", courseId, studentId);
  
    try {
      const query: Partial<Assignment> = {};
      if (courseId) query.courseId = parseInt(courseId as string);
      if (studentId) query.createdBy = parseInt(studentId as string);
  
      const assignments = await assignmentsCollection.find(query).toArray();

      console.log("assignments", assignments);
      const baseDownloadUrl = `${process.env.BASE_URL}/api/files/download/`; // Assuming base URL is in environment variables

      // Add download URLs to assignments response if there are attachments
      const enrichedAssignments = assignments.map((assignment) => {
        if (assignment.attachments && assignment.attachments.length > 0) {
          // Create a download URL for each file
          assignment.attachments = assignment.attachments.map((fileId) => {
            return `${baseDownloadUrl}${fileId}`;
          });
        }
        return assignment;
      });
  
      res.status(200).json(enrichedAssignments);
    } catch (error) {
      console.error("[ASSIGNMENTS] Error fetching assignments:", error);
      res.status(500).json({ error: 'An error occurred while fetching assignments' });
    }
  };
  
  // Update Assignment Controller
  export const updateAssignment = async (req: Request, res: Response) => {
    const db = getDb();
    const assignmentsCollection = db.collection<Assignment>('assignments');
  
    const { assignmentId, assignmentNumber, title, description, dueDate, courseId, isVisible, isCompleted } = req.body;
  
    try {
      const updatedFields: Partial<Assignment> = {};
      if (title) updatedFields.title = title;
      if (description) updatedFields.description = description;
      if (assignmentNumber) updatedFields.assignmentNumber = assignmentNumber;
      if (dueDate) updatedFields.dueDate = new Date(dueDate);
      if (courseId) updatedFields.courseId = courseId;
      if (isVisible !== undefined) updatedFields.isVisible = isVisible;
      if (isCompleted !== undefined) updatedFields.isCompleted = isCompleted;
  
      const result = await assignmentsCollection.updateOne(
        { _id:new ObjectId(assignmentId) },
        { $set: updatedFields }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Assignment not found.' });
      }
  
      res.status(200).json({ message: 'Assignment updated successfully.' });
    } catch (error) {
      console.error("[ASSIGNMENTS] Error updating assignment:", error);
      res.status(500).json({ error: 'An error occurred while updating the assignment' });
    }
  };
  
  // Delete Assignment Controller
  export const deleteAssignment = async (req: Request, res: Response) => {
    const db = getDb();
    const assignmentsCollection = db.collection<Assignment>('assignments');
  
    const { assignmentId } = req.query;
  
    try {
      const result = await assignmentsCollection.deleteOne({ _id: new ObjectId(assignmentId as string) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Assignment not found.' });
      }
  
      res.status(200).json({ message: 'Assignment deleted successfully.' });
    } catch (error) {
      console.error("[ASSIGNMENTS] Error deleting assignment:", error);
      res.status(500).json({ error: 'An error occurred while deleting the assignment' });
    }
  };
