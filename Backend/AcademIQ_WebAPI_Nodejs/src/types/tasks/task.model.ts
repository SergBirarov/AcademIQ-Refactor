import * as db from './task.db';
import { Task } from './task.controller';

export const addTaskModel = async (taskData: Task) => {
    try{
        const result = await db.addTaskDb(taskData);
        console.log("add task result", result);
        return result.recordset;
    }catch(error){
        console.error("Error adding task:", error);
    throw new Error("Failed to add task.");
    }
}

export const updateTaskModel = async (taskData: Task) => {
    try{
        const result = await db.updateTaskDb(taskData);
        return result;
    }catch(error){
        console.error("Error updating task:", error);
    throw new Error("Failed to update task.");
    }
}

export const deleteTaskModel = async (taskId: number) => {
    try{
        console.log("delete task id", taskId);
        await db.deleteTaskDb(taskId);
        return {message: "Task deleted successfuly."};
    }catch(error){
        console.error("Error deleting task:", error);
    throw new Error("Failed to delete task.");
    }
}

export const getTasksModel = async (userId: any, courseId: any) => {
    try{
        const result = await db.getTasksDb(userId, courseId);
        return result.recordset;
    }catch(error){
        console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks.");
    }
}



