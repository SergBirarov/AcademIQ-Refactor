USE [AcademIQ_database_V2]
GO
/****** Object:  StoredProcedure [dbo].[GetAllStudents]    Script Date: 11/17/2024 2:48:18 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[GetAllStudents]
	@City_Code int = Null,
	@School_Year smallint = null,
	@SortColumn nvarchar(50) = 'LastName',
	@SortDirection nvarchar(4) = 'ASC' --or DESC
As
Begin
	Set NOCOUNT on;

	SELECT s.UserId, s.FirstName, s.LastName, s.School_Year, s.Phone, s.Picture_URL, 
           s.Address, c.City_Name, s.Enrollment, s.Email
    FROM Students s
    LEFT JOIN City_Code c ON s.City_Code = c.City_Code
    WHERE (@City_Code IS NULL OR s.City_Code = @City_Code)
      AND (@School_Year IS NULL OR s.School_Year = @School_Year)
    ORDER BY 
        CASE 
            WHEN @SortColumn = 'FirstName' THEN FirstName
            WHEN @SortColumn = 'LastName' THEN LastName
            WHEN @SortColumn = 'Enrollment' THEN cast(Enrollment as nvarchar(50))
            ELSE LastName
		End
		+ ' ' + @SortDirection;
End

exec GetAllStudents 
go