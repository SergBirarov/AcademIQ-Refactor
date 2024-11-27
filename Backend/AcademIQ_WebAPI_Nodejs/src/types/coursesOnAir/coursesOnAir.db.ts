import Db from "../../utils/db";
import sql from "mssql";


//create course and if the dates are in a current range - also add to coursesonair
export async function addCourse(courseDetails: any): Promise<any> {
    try {
        const params = {
            CourseId: courseDetails.CourseId,
            CourseName: courseDetails.CourseName,
            ClassRoomRequired: courseDetails.ClassRoomRequired,
            InstructorId: courseDetails.InstructorId,
            StartDate: courseDetails.StartDate,
            EndDate: courseDetails.EndDate || null,
            ClassRoomCode: courseDetails.ClassRoomCode || null
        };
        console.log("(addCourse)params:", params);
        
        // Execute the AddCourse stored procedure
        const result = await Db.storedProc('AddCourse', params);
        if(!result){
            return "Failed to add course";

        }
        return result; // Assuming the stored procedure returns the status message
    } catch (err) {
        console.error("Error in addCourse function:", err);
        throw err;
    }
}
// coursesOnAir.db.ts


//get all courses on air
export async function getCoursesOnAirDetails(): Promise<any> {
    try {
        const query = `
            SELECT co.CourseId, co.InstructorId, co.StartDate, co.EndDate, crc.ClassRoom AS ClassRoomName,
                   c.CourseName, i.FirstName AS InstructorFirstName, i.LastName AS InstructorLastName
            FROM ActiveStudentCourses ac
            JOIN CoursesOnAir co ON ac.CourseId = co.CourseId
            JOIN Courses c ON co.CourseId = c.CourseId
            JOIN Instructors i ON co.InstructorId = i.UserId
            LEFT JOIN ClassRoomCode crc ON co.ClassRoomCode = crc.ClassRoomId
            WHERE ac.StudentId = @studentId AND (co.EndDate IS NULL OR co.EndDate >= GETDATE());
        `;
        const result = await Db.query(query);
        return result;
    } catch (err) {
        console.error("Error in getCoursesOnAirDetails function:", err);
        throw err;
    }
}

// coursesOnAir.db.ts

//change instructor or add single student
export async function updateCourseOnAir(courseId: number, updateDetails: any): Promise<any> {
    try {
        const { InstructorId, StudentId } = updateDetails;
        let updateQuery = '';

        if (InstructorId) {
            updateQuery += `
                UPDATE CoursesOnAir
                SET InstructorId = @InstructorId
                WHERE CourseId = @CourseId;
            `;
        }

        if (StudentId) {
            updateQuery += `
                INSERT INTO ActiveStudentCourses (StudentId, CourseId)
                VALUES (@StudentId, @CourseId);
            `;
        }

        if (updateQuery) {
            const params = {
                InstructorId: {value: InstructorId, type: sql.Int},
                CourseId: {value: courseId, type: sql.Int},
                StudentId: {value: StudentId, type: sql.Int}
            };
            await Db.query(updateQuery, params);
        }

        return 'Course updated successfully';
    } catch (err) {
        console.error("Error in updateCourseOnAir function:", err);
        throw err;
    }
}


// Function to assign multiple students to a course
export async function assignStudentsToCourse(courseId: number, studentIds: number[]): Promise<any> {
    try {
        // Create a new table-valued parameter
        const studentIdTable = new sql.Table();
        studentIdTable.columns.add('StudentId', sql.Int);
        studentIds.forEach(studentId => {
            studentIdTable.rows.add(studentId);
        });

        // Execute the stored procedure with a table-valued parameter
        let params = {
            CourseId: courseId,
            StudentIds: studentIdTable
        };
        // const request = Db.pool.request();
        // request.input('CourseId', sql.Int, courseId);
        // request.input('StudentIds', studentIdTable);

        const result = await Db.storedProc('AssignStudentsToCourse', params);
        return result.recordset; // Assuming the stored procedure returns the status
    } catch (err) {
        console.error("Error in assignStudentsToCourseDb function:", err);
        throw err;
    }
}

//get courses for specific user 
export async function getActiveCoursesForStudent(studentId: number): Promise<any> {
    try {
        const query = `
            SELECT co.CourseId, co.InstructorId, co.StartDate, co.EndDate, crc.ClassRoom AS ClassRoomName,
                   c.CourseName, i.FirstName AS InstructorFirstName, i.LastName AS InstructorLastName
            FROM ActiveStudentCourses ac
            JOIN CoursesOnAir co ON ac.CourseId = co.CourseId
            JOIN Courses c ON co.CourseId = c.CourseId
            JOIN Instructors i ON co.InstructorId = i.UserId
            LEFT JOIN ClassRoomCode crc ON co.ClassRoomCode = crc.ClassRoomId
            WHERE ac.StudentId = @studentId AND (co.EndDate IS NULL OR co.EndDate >= GETDATE());
        `;

        const result = await Db.query(query, {
             studentId: { value: studentId, type: sql.Int } });
        return result;
    } catch (err) {
        console.error("Error in getActiveCoursesForStudent:", err);
        throw err;
    }
}
