USE [master]
GO
/****** Object:  Database [AcademIQ_database_V2]    Script Date: 28/10/2024 18:23:52 ******/
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
/****** Object:  User [SergBir_SQLLogin_1]    Script Date: 28/10/2024 18:23:56 ******/
CREATE USER [SergBir_SQLLogin_1] FOR LOGIN [SergBir_SQLLogin_1] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [SergBir_SQLLogin_1]
GO
/****** Object:  Schema [SergBir_SQLLogin_1]    Script Date: 28/10/2024 18:23:57 ******/
CREATE SCHEMA [SergBir_SQLLogin_1]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 28/10/2024 18:23:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActiveStudentAssignments]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[ActiveStudentCourses]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[ActiveStudentExamGrades]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Assignments]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Buttons]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Buttons](
	[Id] [int] NOT NULL,
	[ButtonName] [varchar](255) NOT NULL,
	[DefaultSize] [int] NOT NULL,
	[MaxSize] [int] NOT NULL,
	[SizeFactor] [decimal](4, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CalendarEvents]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Cities]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cities](
	[City_Code] [int] NOT NULL,
	[City_Name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[City_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClassRoomCode]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Courses]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[CoursesOnAir]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CoursesOnAir](
	[StudentId] [int] NOT NULL,
	[CourseId] [int] NOT NULL,
	[InstructorId] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NULL,
	[ClassRoomCode] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC,
	[CourseId] ASC,
	[InstructorId] ASC,
	[StartDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Event]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[EventId] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [nvarchar](20) NULL,
	[EventDate] [datetime2](7) NULL,
	[CourseId] [int] NULL,
	[EventTypeCode] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventType]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Exams]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[ExamTypes]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Instructors]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Instructors](
	[InstructorId] [int] NOT NULL,
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
	[InstructorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lectures]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Roles]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Role_Code] [smallint] NOT NULL,
	[Role_Desc] [nvarchar](25) NULL,
PRIMARY KEY CLUSTERED 
(
	[Role_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SemesterCalendar]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SemesterCalendar](
	[CalendarId] [int] NOT NULL,
	[SemesterStartDate] [datetime2](7) NULL,
	[SemesterEndDate] [datetime2](7) NULL,
	[HolidayDates] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[CalendarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[StaffId] [int] NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Role_code] [smallint] NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](13) NULL,
	[City_Code] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StaffId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[Id] [int] NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[School_Year] [smallint] NOT NULL,
	[Phone] [nvarchar](13) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[UserImage] [nvarchar](max) NULL,
	[Address] [nvarchar](50) NULL,
	[City_Code] [int] NULL,
	[Enrollment] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TriggerLog]    Script Date: 28/10/2024 18:23:58 ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] NOT NULL,
	[UserEmail] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[Role_Code] [smallint] NOT NULL,
	[PasswordResetToken] [nvarchar](max) NULL,
	[PasswordResetTokenExpiration] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[UserEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Assignments] ADD  DEFAULT ((1)) FOR [IsVisible]
GO
ALTER TABLE [dbo].[Buttons] ADD  DEFAULT ((100)) FOR [DefaultSize]
GO
ALTER TABLE [dbo].[Buttons] ADD  DEFAULT ((200)) FOR [MaxSize]
GO
ALTER TABLE [dbo].[Buttons] ADD  DEFAULT ((0.2)) FOR [SizeFactor]
GO
ALTER TABLE [dbo].[ActiveStudentAssignments]  WITH CHECK ADD FOREIGN KEY([AssignmentId])
REFERENCES [dbo].[Assignments] ([AssignmentId])
GO
ALTER TABLE [dbo].[ActiveStudentAssignments]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([Id])
GO
ALTER TABLE [dbo].[ActiveStudentCourses]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[ActiveStudentCourses]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([Id])
GO
ALTER TABLE [dbo].[ActiveStudentExamGrades]  WITH CHECK ADD FOREIGN KEY([ExamId])
REFERENCES [dbo].[Exams] ([ExamId])
GO
ALTER TABLE [dbo].[ActiveStudentExamGrades]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([Id])
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
REFERENCES [dbo].[Instructors] ([InstructorId])
GO
ALTER TABLE [dbo].[CoursesOnAir]  WITH CHECK ADD FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([Id])
GO
ALTER TABLE [dbo].[Event]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[Event]  WITH CHECK ADD FOREIGN KEY([EventTypeCode])
REFERENCES [dbo].[EventType] ([EventCode])
GO
ALTER TABLE [dbo].[Exams]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[Exams]  WITH CHECK ADD FOREIGN KEY([ExamTypeId])
REFERENCES [dbo].[ExamTypes] ([ExamTypeId])
GO
ALTER TABLE [dbo].[Instructors]  WITH CHECK ADD FOREIGN KEY([City_Code])
REFERENCES [dbo].[Cities] ([City_Code])
GO
ALTER TABLE [dbo].[Lectures]  WITH CHECK ADD FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([City_Code])
REFERENCES [dbo].[Cities] ([City_Code])
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([Role_code])
REFERENCES [dbo].[Roles] ([Role_Code])
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([Role_code])
REFERENCES [dbo].[Roles] ([Role_Code])
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD FOREIGN KEY([City_Code])
REFERENCES [dbo].[Cities] ([City_Code])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([Role_Code])
REFERENCES [dbo].[Roles] ([Role_Code])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([Role_Code])
REFERENCES [dbo].[Roles] ([Role_Code])
GO
/****** Object:  StoredProcedure [dbo].[AddAssignment]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[AddAssignment]
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
/****** Object:  StoredProcedure [dbo].[AddCalendarEvent]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddCalendarEvent]
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
/****** Object:  StoredProcedure [dbo].[AddCourse]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddCourse]
    @CourseName NVARCHAR(255),
    @ClassRoomRequired BIT
AS
BEGIN
    INSERT INTO Courses (CourseName, ClassRoomRequired)
    VALUES (@CourseName, @ClassRoomRequired);
END
GO
/****** Object:  StoredProcedure [dbo].[AddUser]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddUser]
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
/****** Object:  StoredProcedure [dbo].[AssignStudentToCourse]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AssignStudentToCourse]
    @StudentId INT,
    @CourseId INT
AS
BEGIN
    INSERT INTO ActiveStudentCourses (StudentId, CourseId)
    VALUES (@StudentId, @CourseId);
END
GO
/****** Object:  StoredProcedure [dbo].[GetAssignmentsForStudent]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAssignmentsForStudent]
    @StudentId INT
AS
BEGIN
    SELECT a.*
    FROM Assignments a
    JOIN ActiveStudentAssignments asa ON a.AssignmentId = asa.AssignmentId
    WHERE asa.StudentId = @StudentId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetCoursesForStudent]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[GetCoursesForStudent]
    @StudentId INT
AS
BEGIN
    SELECT c.CourseName, c.CourseId
    FROM Courses c
    JOIN ActiveStudentCourses ascs ON c.CourseId = ascs.CourseId
    WHERE ascs.StudentId = @StudentId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetEventsForCalendar]    Script Date: 28/10/2024 18:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetEventsForCalendar]
    @StartDate DATETIME2,
    @EndDate DATETIME2
AS
BEGIN
    SELECT * FROM CalendarEvents
    WHERE EventDate BETWEEN @StartDate AND @EndDate;
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserByEmail]    Script Date: 28/10/2024 18:23:58 ******/
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
USE [master]
GO
ALTER DATABASE [AcademIQ_database_V2] SET  READ_WRITE 
GO
