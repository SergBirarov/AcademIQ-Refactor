import { Request, Response } from 'express';
import * as taskModel from './task.model';

 export interface Task {
    TaskId?: number; // Auto-generated
    Title: string;
    Description?: string;
    DueDate?: Date;
    CreatedBy: number; // Reference to UserId from Users table
    IsCompleted?: boolean;
    CourseId?: number;
    UserId?: number;
  }
  
//    export interface CourseTask {
//     taskId: number;
//     courseId: number;
//   }
  
//    export interface UserTask {
//     taskId: number;
//     userId: number;
//   }

  export async function addTask(req: Request, res: Response){
    try{
        const taskDetails: Task = req.body;
        taskDetails.CreatedBy = (req as any).user.UserId;
        console.log(taskDetails.CreatedBy);
        console.log(taskDetails);
        const result = await taskModel.addTaskModel(taskDetails);
        console.log(result);
        res.status(201).json({ message: "Task added.", data: result});
    }catch(error){
        console.error("Error in addTask", error);
        res.status(500).json({message: "Failed to add a task", error});
    }
  }

  export async function updateTask(req: Request, res: Response){
    try{
        const updateDetailes: Task = req.body;
        console.log("task controller", updateDetailes);
        const result = await taskModel.updateTaskModel(updateDetailes);
        console.log(" task controller result", result);
        res.status(201).json({ message: "Task updated succesfully.", data: result});
    }catch(error){
        console.error("Error in updateTask", error);
        res.status(500).json({ message: " Failed to update task.", error});
    }
  }

  export async function deleteTask(req: Request, res: Response){
    try{
        const taskId = parseInt(req.params.taskId);
        const UserId = (req as any).user.UserId;
        await taskModel.deleteTaskModel(taskId);
        res.status(200).json({ message: "Task deleted successfuly."});
    }catch(error){
        console.error("Error in deleteTask", error);
        res.status(500).json({ message: "Failed to delete task, ", error});
    }
  }

  export async function getTasks(req: Request, res: Response){
    try{
        const userId = req.query.userId ? Number(req.query.userId) : undefined;
        const courseId = req.query.courseId ? Number(req.query.courseId) : undefined;
        console.log("(getTasks)userId:", userId, "(getTasks)courseId:", courseId);
        // Validate userId to ensure it is a valid number
        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid userId parameter.' });
        }
        const tasks: Task[] = await taskModel.getTasksModel(userId, courseId);
        console.log("(getTasks)tasks:", tasks);
        res.status(200).json(tasks);
    }catch(error){
        console.error("Error in getTasks, ", error);
        res.status(500).json({ message: "Failed to get tasks, ", error});
    }
  }