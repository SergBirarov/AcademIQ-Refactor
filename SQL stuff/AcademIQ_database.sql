/*
use master
GO
drop database AcademIQ_database
GO


CREATE DATABASE AcademIQ_database
COLLATE Hebrew_CI_AS  
GO

use AcademIQ_database
GO
*/


/*Connecting tables*/
/*added*/
CREATE TABLE Cities(
City_Code INT not null PRIMARY KEY ,
City_Name NVARCHAR(50) null 
)
GO


/*added*/
Create Table Roles(
	Role_code smallint Not null PRIMARY KEY,
	Role_desc Nvarchar(25)
	)
GO

create table ClassRoomCode(
	ClassRoomId int primary key not null,
	ClassRoom Nvarchar(20) null
	);

CREATE TABLE ExamTypes (
    ExamTypeId INT PRIMARY KEY,
    ExamTypeName NVARCHAR(50) NOT NULL UNIQUE -- Example values could be 'Midterm', 'Final', 'Quiz', etc.
);

Create table EventType (
	EventCode int primary key not null,
	Type Nvarchar(20)
	);


/*Entities*/
/*added*/
CREATE TABLE Users (
  UserId INT PRIMARY KEY ,
  UserEmail NVARCHAR(50) NOT NULL UNIQUE,
  PasswordHash VARBINARY(255) NOT NULL,
  Role_Code smallint not null,
  PasswordResetToken NVARCHAR(255),
  PasswordResetTokenExpiration DATETIME,
  Foreign key (Role_Code) references Roles(Role_Code)
)
GO



CREATE TABLE Students (
    UserId INT NOT NULL PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    School_Year smallint NOT NULL,
    Phone NVARCHAR(13) NOT NULL UNIQUE,
	Picture_URL NVARCHAR(MAX) NULL ,
	Address NVARCHAR(50) NULL ,
	City_Code int NULL ,
	Enrollment date NULL,
	FOREIGN KEY (City_Code) REFERENCES Cities(City_Code),
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
	)
GO

CREATE TABLE Instructors (
    UserId INT NOT NULL PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(13) NOT NULL UNIQUE,
	Email nvarchar(50) not null,
	Major NVARCHAR(20) NULL,
	EmploymentStartDate date NOT NULL,
	Address NVARCHAR(50) NULL ,
	City_Code INT NULL ,
	FOREIGN KEY (City_Code) REFERENCES Cities(City_Code),
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
)
GO

Create Table Staff (
	UserId int Not Null Primary Key, 
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
	Email Nvarchar(50) Not null,
	Phone Nvarchar(13) UNIQUE,
	City_Code INT NULL,
	FOREIGN KEY (City_Code) REFERENCES Cities(City_Code),
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
	)
GO

/*Course stuff*/
CREATE TABLE Courses (
    CourseId INT PRIMARY KEY, --IDENTITY(1,1)
    CourseName VARCHAR(255) NOT NULL,
    ClassRoomRequired bit 
);

Create table CoursesOnAir(
	StudentId int,
	CourseId int,
	InstructorId int,
	StartDate date,
	EndDate date,
	ClassRoomCode int,
	PRIMARY KEY (StudentId, CourseId, InstructorId, StartDate),
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
	FOREIGN KEY (ClassRoomCode) REFERENCES ClassRoomCode(ClassRoomId),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId),
    FOREIGN KEY (InstructorId) REFERENCES Instructors(InstructorId)
	);

Create table ActiveStudentCourses (
	StudentId int not null,
	CourseId int not null,
	PRIMARY KEY (StudentId, CourseId),
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
	);

/*Assignments and exams*/
CREATE TABLE Assignments (
    AssignmentId INT PRIMARY KEY, --IDENTITY(1,1)
    CourseId INT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NULL,
    DueDate DATETIME2 NOT NULL,
    IsVisible BIT NOT NULL DEFAULT 1, -- 1 - visible, 0 - not visible
	FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);

Create table ActiveStudentAssignments(
	StudentId INT NOT NULL,
    AssignmentId INT NOT NULL,
    SubmissionStatus VARCHAR(50) NULL, 
    SubmissionTimestamp DATETIME2 NULL,
    Grade INT NULL,
	PRIMARY KEY (StudentId, AssignmentId),
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
    FOREIGN KEY (AssignmentId) REFERENCES Assignments(AssignmentId)
	);

CREATE TABLE Exams (
    ExamId INT IDENTITY(1,1) PRIMARY KEY,
    CourseId INT NOT NULL,
    ExamDate DATETIME2 NOT NULL,
    ExamTypeId INT NOT NULL, 
    Description TEXT NULL,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId),
    FOREIGN KEY (ExamTypeId) REFERENCES ExamTypes(ExamTypeId)
);

Create table ActiveStudentExamGrades(
	StudentId INT NOT NULL,
    ExamId INT NOT NULL,
    ExamDate DATETIME2 NULL,
    Grade INT NULL,
	PRIMARY KEY (StudentId, ExamId),
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
    FOREIGN KEY (ExamId) REFERENCES Exams(ExamId)
	);


Create table Lectures (
	LectureId int IDENTITY(1,1) PRIMARY KEY,
	CourseId int not null,
	WeekDay nvarchar(10) not null,
	ClassRoomCode int null,
	StartTime time(0) not null,
	EndTime time(0) not null,
	FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
	);


/*Calendar*/
Create table CalendarEvents(
	EventId int primary key not null,
	EventName Nvarchar(50),
	EventDate datetime2,
	EventType int,
	CourseId int null,
	Description text,
	Foreign key (EventType) references EventType(EventCode)
	);

Create table SemesterCalendar(
	CalendarId int primary key not null,
	SemesterStartDate datetime2,
	SemesterEndDate datetime2,
	HolidayDates json 
	);



/*Optional*/

CREATE TABLE Buttons (
  Id INT PRIMARY KEY,
  ButtonName VARCHAR(255) NOT NULL,
  DefaultSize INT NOT NULL DEFAULT 100,
  MaxSize INT NOT NULL DEFAULT 200,
  SizeFactor DECIMAL(4, 2) NOT NULL DEFAULT 0.2
);

CREATE TABLE UserButtonClicks (
  UserId INT NOT NULL,
  ButtonId INT NOT NULL,
  ClickCount INT NOT NULL DEFAULT 0,
  LastClickTimestamp DATETIME2 NOT NULL,

  CONSTRAINT PK_UserButtonClicks PRIMARY KEY (UserId, ButtonId),
  FOREIGN KEY (UserId) REFERENCES Users (Id),
  FOREIGN KEY (ButtonId) REFERENCES Buttons (Id)
);

CREATE TABLE StudentLessons (
    StudentId INT NOT NULL,
    LessonId INT NOT NULL,
    Attendance VARCHAR(10) NOT NULL DEFAULT 'Absent',
	LessonDate DATE NOT NULL,
    CONSTRAINT PK_StudentLessons PRIMARY KEY (StudentId, LessonId, LessonDate),
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
    FOREIGN KEY (LessonId) REFERENCES Lectures(LectureId)
);


CREATE TABLE TriggerLog (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    TriggerName VARCHAR(255),
    Action VARCHAR(255),
    ObjectName VARCHAR(255),
	UserEmail NVARCHAR(50) NULL,
	MessageToUser NVARCHAR(500) NULL,
    Timestamp DATETIME2
);


/*Data insertion*/

-- Insert into Cities
INSERT INTO Cities (City_Code, City_Name) VALUES
(1, 'Jerusalem'),
(2, 'Tel Aviv'),
(3, 'Haifa'),
(4, 'Beer Sheva'),
(5, 'Rishon LeZion');

-- Insert into Roles
INSERT INTO Roles (Role_code, Role_desc) VALUES
(1, 'Staff'),
(2, 'Professor'),
(3, 'Student');

-- Insert into ClassRoomCode
INSERT INTO ClassRoomCode (ClassRoomId, ClassRoom) VALUES
(1, 'A101'),
(2, 'B202'),
(3, 'C303');

-- Insert into ExamTypes
INSERT INTO ExamTypes (ExamTypeId, ExamTypeName) VALUES
(1, 'Midterm'),
(2, 'Final'),
(3, 'Quiz');

-- Insert into EventType
INSERT INTO EventType (EventCode, Type) VALUES
(1, 'Holiday'),
(2, 'Exam'),
(3, 'Assignment Due');

-- Insert into Users
INSERT INTO Users (UserId, UserEmail, Password, UserRole) VALUES
(1, 'student1@example.com', 'password123', 'Student'),
(2, 'instructor1@example.com', 'teachpass456', 'Professor'),
(3, 'staff1@example.com', 'staffpass789', 'Staff');


-- Insert into Students
INSERT INTO Students (Id, FirstName, LastName, School_Year, Phone, Email, Picture_URL, Address, City_Code, Enrollment) VALUES
(1, 'John', 'Doe', 2023, '054-1234567', 'student1@example.com', NULL, 'Street 1', 1, '2023-01-01');

-- Insert into Instructors
INSERT INTO Instructors (InstructorId, FirstName, LastName, Phone, Email, Major, EmploymentStartDate, Address, City_Code) VALUES
(1, 'Jane', 'Smith', '054-9876543', 'instructor1@example.com', 'Computer Science', '2020-09-01', 'Street 2', 2);

-- Insert into Staff
INSERT INTO Staff (StaffId, FirstName, LastName, Role_code, Email, Phone, City_Code) VALUES
(1, 'Alice', 'Johnson', 1, 'staff1@example.com', '054-1112223', 1);

-- Insert into Courses
INSERT INTO Courses (CourseId, CourseName, ClassRoomRequired) VALUES
(1, 'Introduction to Programming', 1),
(2, 'Database Systems', 0),
(3, 'Operating Systems', 1);

-- Insert into CoursesOnAir
INSERT INTO CoursesOnAir (StudentId, CourseId, InstructorId, StartDate, EndDate, ClassRoomCode) VALUES
(1, 1, 1, '2023-09-01', '2023-12-31', 1);

-- Insert into ActiveStudentCourses
INSERT INTO ActiveStudentCourses (StudentId, CourseId) VALUES
(1, 1),
(1, 2);

-- Insert into Assignments
INSERT INTO Assignments (AssignmentId, CourseId, Title, Description, DueDate, IsVisible) VALUES
(1, 1, 'Project 1', 'Complete the project', '2023-10-15', 1),
(2, 2, 'Homework 1', 'Answer questions', '2023-10-20', 1);

-- Insert into ActiveStudentAssignments
INSERT INTO ActiveStudentAssignments (StudentId, AssignmentId, SubmissionStatus, SubmissionTimestamp, Grade) VALUES
(1, 1, 'Submitted', '2023-10-01', 85),
(1, 2, 'Pending', NULL, NULL);

-- Insert into Exams
INSERT INTO Exams (CourseId, ExamDate, ExamTypeId, Description) VALUES
(1, '2023-11-10', 1, 'Midterm exam covering chapters 1-4');

-- Insert into ActiveStudentExamGrades
INSERT INTO ActiveStudentExamGrades (StudentId, ExamId, ExamDate, Grade) VALUES
(1, 1, '2023-11-10', 90);

-- Insert into Lectures
INSERT INTO Lectures (CourseId, WeekDay, ClassRoomCode, StartTime, EndTime) VALUES
(1, 'Monday', 1, '09:00', '10:30'),
(2, 'Wednesday', 2, '11:00', '12:30');

-- Insert into CalendarEvents
INSERT INTO CalendarEvents (EventId, EventName, EventDate, EventType, CourseId, Description) VALUES
(1, 'Holiday', '2023-12-25', 1, NULL, 'Christmas holiday'),
(2, 'Midterm Exam', '2023-11-10', 2, 1, 'Midterm exam for Introduction to Programming');

-- Insert into SemesterCalendar
INSERT INTO SemesterCalendar (CalendarId, SemesterStartDate, SemesterEndDate, HolidayDates) VALUES
(1, '2023-09-01', '2023-12-31', '[{"date": "2023-12-25", "name": "Christmas"}]');
Go 

/* Procedures */
CREATE PROCEDURE AddUser
    @UserEmail NVARCHAR(50),
    @PasswordHash VARBINARY(255),
    @UserRole NVARCHAR(20)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE UserEmail = @UserEmail)
    BEGIN
        RAISERROR('User already exists', 16, 1);
        RETURN;
    END

    INSERT INTO Users (UserEmail, PasswordHash, UserRole)
    VALUES (@UserEmail, @PasswordHash, @UserRole);
END
GO

CREATE PROCEDURE GetUserByEmail
    @UserEmail NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Users WHERE UserEmail = @UserEmail;
END
GO

CREATE PROCEDURE AddCourse
    @CourseName NVARCHAR(255),
    @ClassRoomRequired BIT
AS
BEGIN
    INSERT INTO Courses (CourseName, ClassRoomRequired)
    VALUES (@CourseName, @ClassRoomRequired);
END
GO

CREATE PROCEDURE AssignStudentToCourse
    @StudentId INT,
    @CourseId INT
AS
BEGIN
    INSERT INTO ActiveStudentCourses (StudentId, CourseId)
    VALUES (@StudentId, @CourseId);
END
GO


CREATE PROCEDURE GetCoursesForStudent
    @StudentId INT
AS
BEGIN
    SELECT c.CourseName, c.CourseId
    FROM Courses c
    JOIN ActiveStudentCourses asc ON c.CourseId = asc.CourseId
    WHERE asc.StudentId = @StudentId;
END
GO

CREATE PROCEDURE AddCalendarEvent
    @EventName NVARCHAR(50),
    @EventDate DATETIME2,
    @EventType INT,
    @Description TEXT
AS
BEGIN
    INSERT INTO CalendarEvents (EventName, EventDate, EventType, Description)
    VALUES (@EventName, @EventDate, @EventType, @Description);
END
GO

CREATE PROCEDURE GetEventsForCalendar
    @StartDate DATETIME2,
    @EndDate DATETIME2
AS
BEGIN
    SELECT * FROM CalendarEvents
    WHERE EventDate BETWEEN @StartDate AND @EndDate;
END
GO


CREATE PROCEDURE AddAssignment
    @CourseId INT,
    @Title NVARCHAR(255),
    @Description TEXT,
    @DueDate DATETIME2
AS
BEGIN
    INSERT INTO Assignments (CourseId, Title, Description, DueDate)
    VALUES (@CourseId, @Title, @Description, @DueDate);
END
GO

CREATE PROCEDURE GetAssignmentsForStudent
    @StudentId INT
AS
BEGIN
    SELECT a.*
    FROM Assignments a
    JOIN ActiveStudentAssignments asa ON a.AssignmentId = asa.AssignmentId
    WHERE asa.StudentId = @StudentId;
END
GO

CREATE TRIGGER UpdateStudentGrade
ON ActiveStudentExamGrades
AFTER UPDATE
AS
BEGIN
    -- Log the update
    INSERT INTO TriggerLog (TriggerName, Action, ObjectName, UserEmail, Timestamp)
    VALUES ('UpdateStudentGrade', 'UPDATE', 'ActiveStudentExamGrades', NULL, GETDATE());
    
    -- Additional actions like sending notifications
    -- EXEC send_email_procedure ...
END
GO

/* Triggers */

--trigger to log when new users are added,
--assignments are submitted, or other important actions occur.

CREATE TRIGGER LogUserInsert
ON Users
AFTER INSERT
AS
BEGIN
    INSERT INTO TriggerLog (TriggerName, Action, ObjectName, UserEmail, Timestamp)
    SELECT 'LogUserInsert', 'INSERT', 'Users', inserted.UserEmail, GETDATE()
    FROM inserted;
END
GO





SELECT @@VERSION;

/*Not added yet*/




