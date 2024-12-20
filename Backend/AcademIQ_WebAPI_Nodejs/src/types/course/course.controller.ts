import { UserType } from './../../user/user.model';
import { Request, Response } from 'express';
import * as courseModel from './course.model';
import * as coursesOnAirModel from '../coursesOnAir/courseOnAir.model'
import Db from '../../utils/db';

export async function addCourse(req: Request, res: Response) {
  try {
      const courseDetails = req.body;
      const result = await courseModel.addCourse(courseDetails);
      res.status(201).json({ message: "Course added successfully", data: result });
  } catch (error) {
      console.error("Error in addCourse:", error);
      res.status(500).json({ message: "Failed to add course", error });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const courseId = req.query.CourseId;

    console.log("(updateCourse)courseId:", courseId);
    const { CourseName, ClassTimes, IsActive, UserId } = req.query;

    const result = Db.storedProc('UpdateCourse', { CourseId: courseId, CourseName: CourseName, ClassTimes: ClassTimes, IsActive: IsActive, UserId:UserId });
    // console.log("(updateCourse)req.query:", req.query);
    // // Enhanced validation for provided fields
    // if (CourseName && typeof CourseName !== 'string') {
    //   return res.status(400).json({ message: "CourseName must be a string" });
    // }

    // if (ClassTimes && typeof ClassTimes !== 'string') {
    //   return res.status(400).json({ message: "ClassTimes must be a string in the format 'Day:StartTime-EndTime,...'" });
    // }

    // if (typeof IsActive !== 'undefined' && typeof IsActive !== 'boolean') {
    //   return res.status(400).json({ message: "IsActive must be a boolean value" });
    // }

    // const updateDetails = {
    //   CourseId: courseId,
    //   ...(CourseName && { CourseName }),
    //   ...(ClassTimes && { ClassTimes }),
    //   ...(typeof IsActive === 'boolean' && { IsActive }),
    //   ...(UserId && { UserId })
    // };

    // if (Object.keys(updateDetails).length <= 1) { 
    //   return res.status(400).json({ message: "No valid fields provided for update" });
    // }

    // console.log("Update details:", updateDetails);

    // const result = await courseModel.updateCourse({
    //   CourseId: courseId,
    //   ...(CourseName && { CourseName }),
    //   ...(ClassTimes && { ClassTimes }),
    //   ...(typeof IsActive === 'boolean' && { IsActive }),
    //   ...(UserId && { UserId })
    // });

    if (result) {
      res.status(200).json({ message: "Course updated successfully", data: result });
    } else {
      res.status(404).json({ message: "Course not found or no updates were made" });
    }

  } catch (error) {
    console.error("Error in updateCourse:", error);
    res.status(500).json({ message: "Failed to update course", error });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
      const courseId = parseInt(req.params.courseId);
      const UserId = (req as any).user.UserId;
      await courseModel.deleteCourse(courseId, UserId);
      res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
      console.error("Error in deleteCourse:", error);
      res.status(500).json({ message: "Failed to delete course", error });
  }
}

export async function getCourses(req: Request, res: Response) {
  try {
      const { active, userId, classRoomRequired, userType } = req.query;
      const filters = {
         Active: active as string,
          UserId: userId? parseInt(userId as string): null,
          ClassRoomRequired: classRoomRequired? ( classRoomRequired === 'true'? 1: 0): null,
           UserType: userType as string || null
           };

           const courses = await courseModel.getCoursesModel(filters);
      res.status(200).json(courses);
  } catch (error) {
      console.error("Error in getCourses:", error);
      res.status(500).json({ message: "Failed to get courses", error });
  }
}



export async function assignStudents(req: Request, res: Response) {
  try {
      const courseId = parseInt(req.params.courseId);
      const { studentIds } = req.body;
      await courseModel.assignStudentsToCourse(courseId, studentIds);
      res.status(200).json({ message: "Students assigned to course successfully" });
  } catch (error) {
      console.error("Error in assignStudents:", error);
      res.status(500).json({ message: "Failed to assign students", error });
  }
}


