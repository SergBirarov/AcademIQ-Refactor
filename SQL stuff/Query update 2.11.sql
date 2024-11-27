alter PROCEDURE AddUser
	@UserId int,
    @UserEmail NVARCHAR(50),
    @PasswordHash NVARCHAR(255),
    @Role_Code int
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE UserEmail = @UserEmail)
    BEGIN
        RAISERROR('User already exists', 16, 1);
        RETURN;
    END

    INSERT INTO Users (UserId ,UserEmail, PasswordHash, Role_Code)
    VALUES (@UserId, @UserEmail, @PasswordHash, @Role_Code);
END
GO


ALTER TABLE Users
ALTER COLUMN PasswordHash NVARCHAR(255);



exec AddUser 206812448, 'serg@example.com', '$2b$10$VkM6uADURapOnmi0BraDK.fMyoNaNjbh4Odsww98M507o78avWTV.',1
go

select * from staff
go 

Create procedure AddStaff
	@UserId int, 
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Phone nvarchar(13),
	@City_Code int
As 
Begin
	IF EXISTS (SELECT 1 FROM Staff WHERE UserId = @UserId)
    BEGIN
        RAISERROR('Staff Member already exists', 16, 1);
        RETURN;
    END
	DECLARE @Email NVARCHAR(50);
    SELECT @Email = UserEmail FROM Users WHERE UserId = @UserId;
	 INSERT INTO Staff (UserId ,FirstName, LastName, Email, Phone, City_Code)
    VALUES (@UserId, @FirstName, @LastName,@Email, @Phone, @City_Code);
End
Go 
