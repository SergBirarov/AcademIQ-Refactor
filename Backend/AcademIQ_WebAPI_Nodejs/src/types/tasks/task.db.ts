import Db from "../../utils/db";
import sql from "mssql";
import { Task } from "./task.controller";

export async function addTaskDb(taskDetails: Partial<Task>): Promise<any>{
    try{
        const params = {
            Title: taskDetails.Title,
            Description: taskDetails.Description,
            DueDate: taskDetails.DueDate || null,
            CreatedBy: taskDetails.CreatedBy ,
            CourseId: taskDetails.CourseId || null
        }
        console.log("task db params",params)
        const result = await Db.storedProc('AddTask', params);
        return result;
    }catch(error){
        console.error("Error in addTaskDb function: ", error);
        throw error;
    }
}



export async function updateTaskDb(taskDetails: any): Promise<any>{
    try{
        const params = {
            TaskId: taskDetails.TaskId,
            Title: taskDetails.Title || null,
            Description: taskDetails.Description || null,
            DueDate: taskDetails.DueDate || null,
            CourseId: taskDetails.CourseId || null,
            IsCompleted: taskDetails.IsCompleted || null
        }
        console.log("task model params",params)
        const result = await Db.storedProc('UpdateTask', params);
        return result;
    }catch(error){
        console.error("Error in updateTaskDb function: ", error);
        throw error;
    }
}

export async function deleteTaskDb(taskId: any): Promise<any>{
    try{
        console.log("delete task id in db", taskId);
        const result = await Db.storedProc('DeleteTask', {TaskId: taskId});
        return result;
    }catch(error){
        console.error("Error in addTaskDb function: ", error);
        throw error;
    }
}

export async function getTasksDb(userId: any, courseId: any){
    try{
    const params = {
        UserId: parseInt(userId),
        CourseId: parseInt(courseId) || null
    }
    const result = await Db.storedProc('GetTasksForUser', params);
    return result;
}catch(error){
    console.error("Error in getTasksDb, ", error);
    throw error;
}
}
