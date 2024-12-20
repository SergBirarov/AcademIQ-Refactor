USE [AcademIQ_database_V2]
GO
/****** Object:  StoredProcedure [dbo].[AddCourse]    Script Date: 11/17/2024 2:44:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[AddCourse]
	@CourseId INT,
    @CourseName NVARCHAR(255),
    @ClassRoomRequired BIT,
    @InstructorId INT,
    @StartDate DATE,
    @EndDate DATE = NULL,
	@ClassRoomCode int = NULL, 
	@UserId int,
	@IPAddress VARCHAR(45) = NULL,
    @UserAgent VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Insert into Courses table
        INSERT INTO Courses (CourseId, CourseName, ClassRoomRequired)
        VALUES (@CourseId, @CourseName, @ClassRoomRequired);

        -- Check if the course is currently active and add to CoursesOnAir table
        IF (@StartDate <= GETDATE() AND ( @EndDate IS NULL OR @EndDate >= GETDATE() ))
        BEGIN
            INSERT INTO CoursesOnAir (CourseId, InstructorId, StartDate, EndDate, ClassRoomCode)
            VALUES (@CourseId, @InstructorId, @StartDate, @EndDate, @ClassRoomCode);
        END

        SELECT 'Course added successfully' AS Status;
		INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('INSERT', 'Courses', @CourseId, @UserId, @IPAddress, @UserAgent, 'Course added successfully', 'Success');

    END TRY
    BEGIN CATCH
       -- Handle any errors that may occur
        DECLARE @ErrorMessage NVARCHAR(4000);
        SELECT @ErrorMessage = ERROR_MESSAGE();
        
        -- Log the failure action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('INSERT', 'Courses', @CourseId, @UserId, @IPAddress, @UserAgent, @ErrorMessage, 'Failure');

    END CATCH
END

CREATE PROCEDURE [dbo].[UpdateCourse]
    @CourseId INT,
    @CourseName NVARCHAR(255) = NULL,
    @ClassRoomRequired BIT = NULL,
    @InstructorId INT = NULL,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL,
    @ClassRoomCode INT = NULL,
    @UserId INT,
    @IPAddress VARCHAR(45) = NULL,
    @UserAgent VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Update Courses table if parameters are provided
        UPDATE Courses
        SET
            CourseName = ISNULL(@CourseName, CourseName),
            ClassRoomRequired = ISNULL(@ClassRoomRequired, ClassRoomRequired)
        WHERE CourseId = @CourseId;

        -- If StartDate or EndDate are provided, update CoursesOnAir
        IF (@InstructorId IS NOT NULL OR @StartDate IS NOT NULL OR @EndDate IS NOT NULL OR @ClassRoomCode IS NOT NULL)
        BEGIN
            UPDATE CoursesOnAir
            SET
                InstructorId = ISNULL(@InstructorId, InstructorId),
                StartDate = ISNULL(@StartDate, StartDate),
                EndDate = ISNULL(@EndDate, EndDate),
                ClassRoomCode = ISNULL(@ClassRoomCode, ClassRoomCode)
            WHERE CourseId = @CourseId;
        END

        -- Log the successful action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('UPDATE', 'Courses', @CourseId, @UserId, @IPAddress, @UserAgent, 'Course updated successfully', 'Success');

        SELECT 'Course updated successfully' AS Status;
    END TRY
    BEGIN CATCH
        -- Handle any errors that may occur
        DECLARE @ErrorMessage NVARCHAR(4000);
        SELECT @ErrorMessage = ERROR_MESSAGE();

        -- Log the failure action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('UPDATE', 'Courses', @CourseId, @UserId, @IPAddress, @UserAgent, @ErrorMessage, 'Failure');

        -- Rethrow the error
        THROW;
    END CATCH
END
GO

CREATE PROCEDURE [dbo].[DeleteCourse]
    @CourseId INT,
    @UserId INT,
    @IPAddress VARCHAR(45) = NULL,
    @UserAgent VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- First delete all related records in ActiveStudentCourses
        DELETE FROM ActiveStudentCourses
        WHERE CourseId = @CourseId;

        -- Delete all related records in CoursesOnAir
        DELETE FROM CoursesOnAir
        WHERE CourseId = @CourseId;

        -- Delete the course from Courses table
        DELETE FROM Courses
        WHERE CourseId = @CourseId;

        -- Log the successful action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('DELETE', 'Courses', @CourseId, @UserId, @IPAddress, @UserAgent, 'Course deleted successfully', 'Success');

        SELECT 'Course deleted successfully' AS Status;
    END TRY
    BEGIN CATCH
        -- Handle any errors that may occur
        DECLARE @ErrorMessage NVARCHAR(4000);
        SELECT @ErrorMessage = ERROR_MESSAGE();

        -- Log the failure action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('DELETE', 'Courses', @CourseId, @UserId, @IPAddress, @UserAgent, @ErrorMessage, 'Failure');

        -- Rethrow the error
        THROW;
    END CATCH
END
GO
