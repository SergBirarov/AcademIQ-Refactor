ALTER TABLE Users DROP COLUMN PasswordResetToken;
GO

ALTER TABLE Users DROP COLUMN PasswordResetTokenExpiration;
GO

delete from users
go

select * from users
go 


insert into Staff(UserId, FirstName,LastName,Email, Phone, City_Code) 
values(111, 'Sergey', 'Birarov','staff@example.com', '052-8355629', 2)
go