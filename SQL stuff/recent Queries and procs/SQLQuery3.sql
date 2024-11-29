USE [AcademIQ_database_V2]
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 11/16/2024 8:37:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[GetUserById]
    @UserId int
AS
BEGIN
    SELECT * FROM Users WHERE UserId = @UserId;
END
go

create procedure GetStaffById
	@UserId int
As
Begin
	Select * from Staff Where UserId = @UserId;
End
