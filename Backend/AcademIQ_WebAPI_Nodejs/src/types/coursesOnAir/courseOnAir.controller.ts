// courseOnAir.controller.ts
import { Request, Response } from "express";
import { addCourseModel,getActiveCoursesForStudentModel , getCoursesOnAirModel, updateCourseOnAirModel, assignStudentsToCourseModel  } from "./courseOnAir.model";
import { type } from "os";

export async function addCourse(req: Request, res: Response) {

    try {
        const { CourseId, CourseName, ClassRoomRequired, InstructorId, StartDate, EndDate, ClassRoomCode } = req.body;

        if (!CourseId || !CourseName || !ClassRoomRequired == undefined || !InstructorId || !StartDate) {
            return res.status(400).json({ message: "Required fields: CourseId, CourseName, ClassRoomRequired, InstructorId, StartDate" });
        }

        const courseDetails = { CourseId, CourseName, ClassRoomRequired, InstructorId, StartDate, EndDate, ClassRoomCode };
        console.log("(addCourse)courseDetails:", courseDetails);
        const result = await addCourseModel(courseDetails);

        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
// {
//     "CourseId": 1,
//     "InstructorId": 1111,
//     "StartDate": "20/10/2024",
//     "EndDate": "01/07/2025",
//     "ClassRoomCode": 1
// }


// Get detailed data for courses on air
export async function getCoursesOnAir(req: Request, res: Response) {
    try {
        const courses = await getCoursesOnAirModel();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

// Update an existing course on air
export async function updateCourseOnAir(req: Request, res: Response) {
    try {
        const { courseId } = req.params;
        const updateDetails = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "CourseId is required" });
        }

        const result = await updateCourseOnAirModel(parseInt(courseId), updateDetails);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export async function assignStudentsToCourse(req: Request, res: Response) {
    try {
        const { courseId } = req.params;
        const { StudentIds } = req.body;

        if (!courseId || !StudentIds || !Array.isArray(StudentIds) || StudentIds.length === 0) {
            return res.status(400).json({ message: "CourseId and studentIds are required and studentIds should be an array." });
        }

        const result = await assignStudentsToCourseModel(parseInt(courseId), StudentIds);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}


export async function getActiveCoursesForStudent(req: Request, res: Response) {
    try {
        const StudentId = (req as any).user.UserId; 
        console.log("(getActiveCoursesForStudent)StudentId:", StudentId);

        if (!StudentId) {
            return res.status(400).json({ message: "StudentId is required" });
        }
        const result = await getActiveCoursesForStudentModel(parseInt(StudentId));

        if (!result) {
            return res.status(404).json({ message: "No active courses found for this student" });
        }
        console.log("(getActiveCoursesForStudent)result:", result);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}