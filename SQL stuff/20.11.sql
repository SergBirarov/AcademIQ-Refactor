USE [AcademIQ_database_V2]
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 11/19/2024 9:50:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetUserById]
    @UserId INT
AS
BEGIN TRY
    SET NOCOUNT ON;
	 DECLARE @Role_Code INT;
    SELECT @Role_Code = Role_Code FROM Users WHERE UserId = @UserId;

    -- Validate if the user exists
    IF @Role_Code IS NULL
    BEGIN
        RAISERROR('User not found or invalid UserId.', 16, 1);
        RETURN;
    END
    IF @Role_Code = 3 -- Role for Students
    BEGIN
        SELECT 
            u.UserId, u.UserEmail, u.PasswordHash, u.Role_Code, s.FirstName, s.LastName, s.School_Year,
            s.Phone, s.Picture_URL, s.Address, c.City_Name, s.Enrollment
        FROM Users u
        INNER JOIN Students s ON u.UserId = s.UserId
        WHERE u.UserId = @UserId
		From Cities c
		inner join Cities c on c.City_Name = s.City_Code
    END
    ELSE IF @Role_Code = 2 -- Role for Instructors
    BEGIN
        SELECT 
            u.UserId, u.UserEmail, u.PasswordHash, u.Role_Code, i.FirstName, i.LastName, i.Phone,
            i.Major, i.EmploymentStartDate, i.Address, i.City_Code
        FROM Users u
        INNER JOIN Instructors i ON u.UserId = i.UserId
        WHERE u.UserId = @UserId;
    END
    ELSE IF @Role_Code = 1 -- Role for Staff
    BEGIN
        SELECT 
            u.UserId, u.UserEmail, u.PasswordHash, u.Role_Code, st.FirstName, st.LastName, st.Phone, 
            st.City_Code
        FROM Users u
        INNER JOIN Staff st ON u.UserId = st.UserId
        WHERE u.UserId = @UserId;
    END
    ELSE
    BEGIN
        -- Invalid role code provided
        RAISERROR('Invalid Role_Code. Please provide a valid role.', 16, 1);
    END

END TRY
BEGIN CATCH
    -- Handle any errors that may occur
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage, 16, 1);
END CATCH;


exec GetUserById 2222
go

select * from students
go

update Students
set Major='Software Engeneering'
where UserId = 2222
go