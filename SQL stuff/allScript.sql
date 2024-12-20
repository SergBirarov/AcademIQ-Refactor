USE [master]
GO
/****** Object:  Database [AcademIQ_database_V2]    Script Date: 11/18/2024 2:09:15 PM ******/
CREATE DATABASE [AcademIQ_database_V2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AcademIQ_database_V2_Data', FILENAME = N'c:\dzsqls\AcademIQ_database_V2.mdf' , SIZE = 8192KB , MAXSIZE = 30720KB , FILEGROWTH = 22528KB )
 LOG ON 
( NAME = N'AcademIQ_database_V2_Logs', FILENAME = N'c:\dzsqls\AcademIQ_database_V2.ldf' , SIZE = 8192KB , MAXSIZE = 30720KB , FILEGROWTH = 22528KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [AcademIQ_database_V2] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AcademIQ_database_V2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AcademIQ_database_V2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET ARITHABORT OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AcademIQ_database_V2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AcademIQ_database_V2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET  ENABLE_BROKER 
GO
ALTER DATABASE [AcademIQ_database_V2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AcademIQ_database_V2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AcademIQ_database_V2] SET  MULTI_USER 
GO
ALTER DATABASE [AcademIQ_database_V2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AcademIQ_database_V2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AcademIQ_database_V2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AcademIQ_database_V2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AcademIQ_database_V2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AcademIQ_database_V2] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [AcademIQ_database_V2] SET QUERY_STORE = OFF
GO
USE [AcademIQ_database_V2]
GO
/****** Object:  User [SergBir_SQLLogin_1]    Script Date: 11/18/2024 2:09:21 PM ******/
CREATE USER [SergBir_SQLLogin_1] FOR LOGIN [SergBir_SQLLogin_1] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [SergBir_SQLLogin_1]
GO
/****** Object:  Schema [SergBir_SQLLogin_1]    Script Date: 11/18/2024 2:09:22 PM ******/
CREATE SCHEMA [SergBir_SQLLogin_1]
GO
/****** Object:  UserDefinedTableType [dbo].[StudentIdTableType]    Script Date: 11/18/2024 2:09:22 PM ******/
CREATE TYPE [dbo].[StudentIdTableType] AS TABLE(
	[StudentId] [int] NULL
)
GO
/****** Object:  Table [dbo].[ActiveStudentAssignments]    Script Date: 11/18/2024 2:09:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActiveStudentAssignments](
	[StudentId] [int] NOT NULL,
	[AssignmentId] [int] NOT NULL,
	[SubmissionStatus] [varchar](50) NULL,
	[SubmissionTimestamp] [datetime2](7) NULL,
	[Grade] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC,
	[AssignmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActiveStudentCourses]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActiveStudentCourses](
	[StudentId] [int] NOT NULL,
	[CourseId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC,
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActiveStudentExamGrades]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActiveStudentExamGrades](
	[StudentId] [int] NOT NULL,
	[ExamId] [int] NOT NULL,
	[ExamDate] [datetime2](7) NULL,
	[Grade] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC,
	[ExamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Assignments]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Assignments](
	[AssignmentId] [int] NOT NULL,
	[CourseId] [int] NOT NULL,
	[Title] [varchar](255) NOT NULL,
	[Description] [text] NULL,
	[DueDate] [datetime2](7) NOT NULL,
	[IsVisible] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AssignmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CalendarEvents]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CalendarEvents](
	[EventId] [int] NOT NULL,
	[EventName] [nvarchar](50) NULL,
	[EventDate] [datetime2](7) NULL,
	[EventType] [int] NULL,
	[CourseId] [int] NULL,
	[Description] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City_Code]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City_Code](
	[City_Code] [int] NOT NULL,
	[City_Name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[City_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClassRoomCode]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClassRoomCode](
	[ClassRoomId] [int] NOT NULL,
	[ClassRoom] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClassRoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[CourseId] [int] NOT NULL,
	[CourseName] [varchar](255) NOT NULL,
	[ClassRoomRequired] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CoursesOnAir]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CoursesOnAir](
	[CourseId] [int] NOT NULL,
	[InstructorId] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NULL,
	[ClassRoomCode] [int] NULL,
 CONSTRAINT [PK_CoursesOnAir] PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC,
	[InstructorId] ASC,
	[StartDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventType]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventType](
	[EventCode] [int] NOT NULL,
	[Type] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[EventCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exams]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exams](
	[ExamId] [int] IDENTITY(1,1) NOT NULL,
	[CourseId] [int] NOT NULL,
	[ExamDate] [datetime2](7) NOT NULL,
	[ExamTypeId] [int] NOT NULL,
	[Description] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[ExamId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExamTypes]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExamTypes](
	[ExamTypeId] [int] NOT NULL,
	[ExamTypeName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ExamTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ExamTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Instructors]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Instructors](
	[UserId] [int] NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](13) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Major] [nvarchar](20) NULL,
	[EmploymentStartDate] [date] NOT NULL,
	[Address] [nvarchar](50) NULL,
	[City_Code] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lectures]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lectures](
	[LectureId] [int] IDENTITY(1,1) NOT NULL,
	[CourseId] [int] NOT NULL,
	[WeekDay] [nvarchar](10) NOT NULL,
	[ClassRoomCode] [int] NULL,
	[StartTime] [time](0) NOT NULL,
	[EndTime] [time](0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LectureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Role_Code] [int] NOT NULL,
	[Role_Desc] [nvarchar](25) NULL,
PRIMARY KEY CLUSTERED 
(
	[Role_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SemesterCalendar]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SemesterCalendar](
	[CalendarId] [int] NOT NULL,
	[SemesterStartDate] [datetime2](7) NULL,
	[SemesterEndDate] [datetime2](7) NULL,
	[HolidayDates] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[CalendarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[UserId] [int] NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](13) NULL,
	[City_Code] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[UserId] [int] NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[School_Year] [smallint] NOT NULL,
	[Phone] [nvarchar](13) NOT NULL,
	[Picture_URL] [nvarchar](max) NULL,
	[Address] [nvarchar](50) NULL,
	[City_Code] [int] NULL,
	[Enrollment] [date] NULL,
	[Email] [nvarchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TriggerLog]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TriggerLog](
	[LogID] [int] IDENTITY(1,1) NOT NULL,
	[TriggerName] [varchar](255) NULL,
	[Action] [varchar](255) NULL,
	[ObjectName] [varchar](255) NULL,
	[UserEmail] [nvarchar](50) NULL,
	[MessageToUser] [nvarchar](500) NULL,
	[Timestamp] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TriggerLogNew]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TriggerLogNew](
	[LogID] [int] IDENTITY(1,1) NOT NULL,
	[ActionID] [uniqueidentifier] NOT NULL,
	[ActionType] [varchar](50) NOT NULL,
	[ObjectName] [varchar](255) NULL,
	[ObjectID] [int] NULL,
	[UserId] [int] NULL,
	[UserEmail] [nvarchar](50) NULL,
	[IPAddress] [varchar](45) NULL,
	[UserAgent] [varchar](255) NULL,
	[MessageToUser] [nvarchar](500) NULL,
	[Status] [varchar](50) NOT NULL,
	[Details] [nvarchar](max) NULL,
	[CorrelationID] [uniqueidentifier] NULL,
	[ActionTimestamp] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] NOT NULL,
	[UserEmail] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](255) NULL,
	[Role_Code] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[UserEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Assignments] ADD  DEFAULT ((1)) FOR [IsVisible]
GO
ALTER TABLE [dbo].[TriggerLogNew] ADD  DEFAULT (newid()) FOR [ActionID]
GO
ALTER TABLE [dbo].[TriggerLogNew] ADD  DEFAULT (getdate()) FOR [ActionTimestamp]
GO
ALTER TABLE [dbo].[ActiveStudentAssignments]  WITH CHECK ADD FOREIGN KEY([AssignmentId])
REFERENCES [dbo].[Assignments] ([AssignmentId])
GO
ALTER TABLE [dbo].[ActiveStudentAssignments]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([UserId])
GO
ALTER TABLE [dbo].[ActiveStudentCourses]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[ActiveStudentCourses]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([UserId])
GO
ALTER TABLE [dbo].[ActiveStudentExamGrades]  WITH CHECK ADD FOREIGN KEY([ExamId])
REFERENCES [dbo].[Exams] ([ExamId])
GO
ALTER TABLE [dbo].[ActiveStudentExamGrades]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([UserId])
GO
ALTER TABLE [dbo].[Assignments]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[CalendarEvents]  WITH CHECK ADD FOREIGN KEY([EventType])
REFERENCES [dbo].[EventType] ([EventCode])
GO
ALTER TABLE [dbo].[CoursesOnAir]  WITH CHECK ADD FOREIGN KEY([ClassRoomCode])
REFERENCES [dbo].[ClassRoomCode] ([ClassRoomId])
GO
ALTER TABLE [dbo].[CoursesOnAir]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[CoursesOnAir]  WITH CHECK ADD FOREIGN KEY([InstructorId])
REFERENCES [dbo].[Instructors] ([UserId])
GO
ALTER TABLE [dbo].[Exams]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[Exams]  WITH CHECK ADD FOREIGN KEY([ExamTypeId])
REFERENCES [dbo].[ExamTypes] ([ExamTypeId])
GO
ALTER TABLE [dbo].[Instructors]  WITH CHECK ADD FOREIGN KEY([City_Code])
REFERENCES [dbo].[City_Code] ([City_Code])
GO
ALTER TABLE [dbo].[Instructors]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Lectures]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([City_Code])
REFERENCES [dbo].[City_Code] ([City_Code])
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD FOREIGN KEY([City_Code])
REFERENCES [dbo].[City_Code] ([City_Code])
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([Role_Code])
REFERENCES [dbo].[Roles] ([Role_Code])
GO
/****** Object:  StoredProcedure [dbo].[AddCourse]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCourse]
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
GO
/****** Object:  StoredProcedure [dbo].[AddCourseOnAir]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCourseOnAir]
    @CourseId INT,
    @InstructorId INT,
    @StartDate DATE,
    @EndDate DATE = NULL,
    @ClassRoomCode INT = NULL
AS
BEGIN
    IF EXISTS (SELECT 1 FROM CoursesOnAir WHERE  CourseId = @CourseId AND InstructorId = @InstructorId AND StartDate = @StartDate)
    BEGIN
        SELECT 'Course is already on air for this student with the given details' AS Status;
        RETURN;
    END

    INSERT INTO CoursesOnAir (CourseId, InstructorId, StartDate, EndDate, ClassRoomCode)
    VALUES ( @CourseId, @InstructorId, @StartDate, @EndDate, @ClassRoomCode);

    SELECT 'Course added successfully to CoursesOnAir' AS Status;
END

GO
/****** Object:  StoredProcedure [dbo].[AddInstructor]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[AddInstructor]
	@UserId int,
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Phone nvarchar(13),
	--email
	@Major nvarchar(20),
	@EmploymentStartDate Date,
	@Address nvarchar(50),
	@City_Code int
As
Begin
	If exists (Select 1 from Instructors Where UserId = @UserId)
	Begin 
		SELECT 'Instructor already exists' As Status;
		Return;
	End
	DECLARE @Email NVARCHAR(30);
    SELECT @Email = UserEmail FROM Users WHERE UserId = @UserId; 
	Insert into Instructors(UserId, FirstName, LastName, Phone, Email, Major,EmploymentStartDate, Address, City_Code )
	values(@UserId,
	@FirstName ,
	@LastName ,
	@Phone ,
	@Email,
	@Major ,
	@EmploymentStartDate ,
	@Address,
	@City_Code)
End
GO
/****** Object:  StoredProcedure [dbo].[AddStaff]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[AddStaff]
	@UserId int, 
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Phone nvarchar(13),
	@City_Code int
As 
Begin
	IF EXISTS (SELECT 1 FROM Staff WHERE UserId = @UserId)
    BEGIN
        SELECT 'Staff Member already exists' As Status;
        RETURN;
    END
	DECLARE @Email NVARCHAR(50);
    SELECT @Email = UserEmail FROM Users WHERE UserId = @UserId;
	 INSERT INTO Staff (UserId ,FirstName, LastName, Email, Phone, City_Code)
    VALUES (@UserId, @FirstName, @LastName,@Email, @Phone, @City_Code);
End
GO
/****** Object:  StoredProcedure [dbo].[AddStudent]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[AddStudent]
	@UserId int,
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@School_Year smallint,
	@Phone nvarchar(13),
	@Picture_URL nvarchar(max),
	@Address nvarchar(50),
	@City_Code int,
	@Enrollment Date
As
Begin
	If exists (Select 1 from Students Where UserId = @UserId)
	Begin 
		SELECT 'Student already exists' As Status;
		Return;
	End
	DECLARE @Email NVARCHAR(30);
    SELECT @Email = UserEmail FROM Users WHERE UserId = @UserId; 
	Insert into Students(UserId, FirstName, LastName, School_Year, Phone, Picture_URL, Address, City_Code, Enrollment, Email)
	values(@UserId ,
	@FirstName ,
	@LastName ,
	@School_Year,
	@Phone,
	@Picture_URL,
	@Address ,
	@City_Code ,
	@Enrollment,
	@Email)
End
GO
/****** Object:  StoredProcedure [dbo].[AddUser]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddUser]
	@UserId int,
    @UserEmail NVARCHAR(50),
    @PasswordHash NVARCHAR(255),
    @Role_Code int,
	@IPAddress varchar(45) = null,
	@UserAgent varchar(255) = null
AS
BEGIN
    BEGIN try
    IF EXISTS (SELECT 1 FROM Users WHERE UserId = @UserId)
	begin
        SELECT 'User already exists' As Status;
		INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, UserEmail, IPAddress, UserAgent, MessageToUser, Status)
            VALUES ('INSERT', 'Users', @UserId, @UserId, @UserEmail, @IPAddress, @UserAgent, 'User already exists', 'Failure');
            RETURN;
    END

    INSERT INTO Users (UserId ,UserEmail, PasswordHash, Role_Code)
    VALUES (@UserId, @UserEmail, @PasswordHash, @Role_Code);

	INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, UserEmail, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('INSERT', 'Users', @UserId, @UserId, @UserEmail, @IPAddress, @UserAgent, 'User added successfully', 'Success');

	End try
	Begin catch
		 -- Handle any errors that may occur
        DECLARE @ErrorMessage NVARCHAR(4000);
        SELECT @ErrorMessage = ERROR_MESSAGE();
        
        -- Log the failure action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, UserEmail, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('INSERT', 'Users', @UserId, @UserId, @UserEmail, @IPAddress, @UserAgent, @ErrorMessage, 'Failure');
	End catch
END
GO
/****** Object:  StoredProcedure [dbo].[AssignStudentsToCourse]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AssignStudentsToCourse]
    @CourseId INT,
    @StudentIds dbo.StudentIdTableType READONLY,
	@UserId int,
	@IPAddress VARCHAR(45) = NULL,
    @UserAgent VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Insert students into ActiveStudentCourses if they are not already assigned
        INSERT INTO ActiveStudentCourses (StudentId, CourseId)
        SELECT StudentId, @CourseId
        FROM @StudentIds si
        WHERE NOT EXISTS (
            SELECT 1 
            FROM ActiveStudentCourses ac
            WHERE ac.StudentId = si.StudentId AND ac.CourseId = @CourseId
        );

        SELECT 'Students assigned to course successfully.' AS Status;

		INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status, Details)
        VALUES ('INSERT', 'ActiveStudentCourses', @CourseId, @UserId, @IPAddress, @UserAgent, 'Students assigned to course successfully', 'Success', 'Assigned student IDs to course');

    END TRY
    BEGIN CATCH
       -- Handle any errors that may occur
        DECLARE @ErrorMessage NVARCHAR(4000);
        SELECT @ErrorMessage = ERROR_MESSAGE();

        -- Log the failure action
        INSERT INTO TriggerLogNew (ActionType, ObjectName, ObjectID, UserId, IPAddress, UserAgent, MessageToUser, Status)
        VALUES ('INSERT', 'ActiveStudentCourses', @CourseId, @UserId, @IPAddress, @UserAgent, @ErrorMessage, 'Failure');

    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteCourse]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  StoredProcedure [dbo].[GetActiveCoursesByUser]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetActiveCoursesByUser]
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
/****** Object:  StoredProcedure [dbo].[GetAllInstructors]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetAllInstructors]
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
GO
/****** Object:  StoredProcedure [dbo].[GetAllStudents]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[GetAllStudents]
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
GO
/****** Object:  StoredProcedure [dbo].[GetCourses]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetCourses]
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
/****** Object:  StoredProcedure [dbo].[GetStaffById]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetStaffById]
	@UserId int
As
Begin
	Select * from Staff Where UserId = @UserId;
End
GO
/****** Object:  StoredProcedure [dbo].[GetStudentsByCourse]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetStudentsByCourse]
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
/****** Object:  StoredProcedure [dbo].[GetUserByEmail]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUserByEmail]
    @UserEmail NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Users WHERE UserEmail = @UserEmail;
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUserById]
    @UserId int
AS
BEGIN
    SELECT * FROM Users WHERE UserId = @UserId;
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateCourse]    Script Date: 11/18/2024 2:09:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
USE [master]
GO
ALTER DATABASE [AcademIQ_database_V2] SET  READ_WRITE 
GO
