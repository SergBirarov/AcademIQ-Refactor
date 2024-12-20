USE [AcademIQ_database_V2]
GO
/****** Object:  StoredProcedure [dbo].[GetAllInstructors]    Script Date: 11/17/2024 12:20:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetAllInstructors]
    @City_Code INT = NULL,
    @Major NVARCHAR(20) = NULL,
    @SortColumn NVARCHAR(50) = 'LastName',
    @SortDirection NVARCHAR(4) = 'ASC' -- Can be 'ASC' or 'DESC'
AS
BEGIN
    SET NOCOUNT ON;

    SELECT i.UserId, i.FirstName, i.LastName, i.Phone, i.Email, i.Major, 
           i.EmploymentStartDate, i.Address, c.City_Name
    FROM Instructors i
    LEFT JOIN City_Code c ON i.City_Code = c.City_Code
    WHERE (@City_Code IS NULL OR i.City_Code = @City_Code)
      AND (@Major IS NULL OR i.Major = @Major)
    ORDER BY 
        CASE 
            WHEN @SortColumn = 'FirstName' THEN FirstName
            WHEN @SortColumn = 'LastName' THEN LastName
            WHEN @SortColumn = 'EmploymentStartDate' THEN cast(EmploymentStartDate as nvarchar(50))
            ELSE LastName
        END
    + ' ' + @SortDirection;
END
go

create PROCEDURE GetCourses
    @Active NVARCHAR(10) = NULL, -- 'Yes' or 'No'
    @ClassRoomRequired BIT = NULL -- 1 or 0
AS
BEGIN
    SET NOCOUNT ON;

    SELECT c.CourseId, c.CourseName, c.ClassRoomRequired, 
           coa.InstructorId, coa.StartDate, coa.EndDate,
           cr.ClassRoom AS ClassRoomName,
           i.FirstName AS InstructorFirstName, i.LastName AS InstructorLastName
    FROM Courses c
    LEFT JOIN CoursesOnAir coa ON c.CourseId = coa.CourseId
    LEFT JOIN ClassRoomCode cr ON coa.ClassRoomCode = cr.ClassRoomId
    LEFT JOIN Instructors i ON coa.InstructorId = i.UserId
    WHERE 
        (@Active IS NULL OR 
            (@Active = 'Yes' AND coa.StartDate <= GETDATE() AND (coa.EndDate IS NULL OR coa.EndDate >= GETDATE())) OR
            (@Active = 'No' AND (coa.StartDate > GETDATE() OR coa.EndDate < GETDATE())))
        AND (@ClassRoomRequired IS NULL OR c.ClassRoomRequired = @ClassRoomRequired)
    ORDER BY c.CourseName, coa.StartDate;
END
GO

exec GetCourses 
go

CREATE PROCEDURE GetActiveCoursesByUser
    @UserId INT,
    @UserType NVARCHAR(10) -- 'Student' or 'Instructor'
AS
BEGIN
    SET NOCOUNT ON;

    IF @UserType = 'Student'
    BEGIN
        SELECT c.CourseId, c.CourseName, 
               coa.StartDate, coa.EndDate,
               cr.ClassRoom AS ClassRoomName,
               i.FirstName AS InstructorFirstName, i.LastName AS InstructorLastName
        FROM ActiveStudentCourses ascc
        INNER JOIN CoursesOnAir coa ON ascc.CourseId = coa.CourseId
        INNER JOIN Courses c ON coa.CourseId = c.CourseId
        LEFT JOIN ClassRoomCode cr ON coa.ClassRoomCode = cr.ClassRoomId
        LEFT JOIN Instructors i ON coa.InstructorId = i.UserId
        WHERE ascc.StudentId = @UserId
          AND coa.StartDate <= GETDATE() 
          AND (coa.EndDate IS NULL OR coa.EndDate >= GETDATE())
        ORDER BY c.CourseName, coa.StartDate;
    END
    ELSE IF @UserType = 'Instructor'
    BEGIN
        SELECT c.CourseId, c.CourseName,
               coa.StartDate, coa.EndDate,
               cr.ClassRoom AS ClassRoomName
        FROM CoursesOnAir coa
        INNER JOIN Courses c ON coa.CourseId = c.CourseId
        LEFT JOIN ClassRoomCode cr ON coa.ClassRoomCode = cr.ClassRoomId
        WHERE coa.InstructorId = @UserId
          AND coa.StartDate <= GETDATE() 
          AND (coa.EndDate IS NULL OR coa.EndDate >= GETDATE())
        ORDER BY c.CourseName, coa.StartDate;
    END
    ELSE
    BEGIN
        -- Handle invalid user type
        RAISERROR('Invalid user type. Must be either ''Student'' or ''Instructor''.', 16, 1);
    END
END
GO

exec GetActiveCoursesByUser 1111, 'Instructor'
go 


CREATE PROCEDURE GetStudentsByCourse
    @CourseId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT s.UserId, s.FirstName, s.LastName, s.School_Year, s.Phone, 
           s.Email, s.Address, c.City_Name
    FROM ActiveStudentCourses ascc
    INNER JOIN Students s ON ascc.StudentId = s.UserId
    LEFT JOIN City_Code c ON s.City_Code = c.City_Code
    WHERE ascc.CourseId = @CourseId
    ORDER BY s.LastName, s.FirstName;
END
GO

exec GetStudentsByCourse 1112
go


select * from CoursesOnAir
go