drop table Tasks 
go

CREATE TABLE Tasks (
    TaskId INT IDENTITY PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    DueDate DATETIME NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy INT NOT NULL, -- References UserId from Users table
    IsCompleted BIT DEFAULT 0
);

CREATE TABLE CourseTasks (
    CourseTaskId INT IDENTITY PRIMARY KEY,
    TaskId INT NOT NULL,
    CourseId INT NOT NULL,
    FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);

CREATE TABLE UserTasks (
    UserTaskId INT IDENTITY PRIMARY KEY,
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

select * from UserTasks
go


create PROCEDURE AddTask
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @DueDate DATETIME = NULL,
    @CreatedBy INT,
    @CourseId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TaskId INT;

    -- Insert into Tasks table
    INSERT INTO Tasks (Title, Description, DueDate, CreatedBy, CreatedDate)
    VALUES (@Title, @Description, @DueDate, @CreatedBy, GETDATE());

    SET @TaskId = SCOPE_IDENTITY();

    -- Insert into UserTasks table
    INSERT INTO UserTasks (TaskId, UserId)
    VALUES (@TaskId, @CreatedBy);

    -- If a CourseId is provided, insert into CourseTasks
    IF @CourseId IS NOT NULL
    BEGIN
        INSERT INTO CourseTasks (TaskId, CourseId)
        VALUES (@TaskId, @CourseId);
    END
END;
go 


create PROCEDURE UpdateTask
    @TaskId INT,
    @Title NVARCHAR(255) = NULL,
    @Description NVARCHAR(MAX) = NULL,
    @DueDate DATETIME = NULL,
	@CourseId int = null,
    @IsCompleted BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the Tasks table
    UPDATE Tasks
    SET 
        Title = ISNULL(@Title, Title),
        Description = ISNULL(@Description, Description),
        DueDate = ISNULL(@DueDate, DueDate),
        UpdatedDate = GETDATE(),
        IsCompleted = ISNULL(@IsCompleted, IsCompleted)
    WHERE TaskId = @TaskId;

    -- Update or Insert into CourseTasks table
    IF @CourseId IS NOT NULL
    BEGIN
        -- Check if there's an existing CourseTask entry for the given TaskId
        IF EXISTS (SELECT 1 FROM CourseTasks WHERE TaskId = @TaskId)
        BEGIN
            -- Update the existing CourseTask
            UPDATE CourseTasks
            SET CourseId = @CourseId
            WHERE TaskId = @TaskId;
        END
        ELSE
        BEGIN
            -- Insert a new entry if no CourseTask exists for this TaskId
            INSERT INTO CourseTasks (TaskId, CourseId)
            VALUES (@TaskId, @CourseId);
        END
    END
    ELSE
    BEGIN
        -- If CourseId is NULL, remove any existing relationship in CourseTasks
        DELETE FROM CourseTasks WHERE TaskId = @TaskId;
    END
END;



create PROCEDURE GetTasksForUser
    @UserId INT,
    @CourseId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        t.TaskId,
        t.Title,
        t.Description,
        t.DueDate,
        t.CreatedDate,
        t.IsCompleted,
        c.CourseId,
        c.CourseName,
        u.UserId
    FROM 
        Tasks t
    INNER JOIN UserTasks ut ON t.TaskId = ut.TaskId
    LEFT JOIN CourseTasks ct ON t.TaskId = ct.TaskId
    LEFT JOIN Courses c ON ct.CourseId = c.CourseId
    INNER JOIN Users u ON ut.UserId = u.UserId
    WHERE 
        ut.UserId = @UserId
        AND (@CourseId IS NULL OR c.CourseId = @CourseId);
END;





exec AddTask @Title='some task2',  @Description='some desc2', @DueDate='2024-11-29', @CreatedBy=2222, @CourseId=1113
go


EXEC GetTasksForUser @UserId = 2222;

select * from tasks 
go 

delete from Tasks
go

exec UpdateTask @TaskId=2, @Title='cheking update', @CourseId=1113
go 


select * from instructors
go

INSERT INTO ClassRoomCode (ClassRoomId, ClassRoom)
VALUES 
    
    (4, 'Lab Room B'),
    (5, 'Conference Room 1'),
    (6, 'Seminar Hall 1'),
    (7, 'Seminar Hall 2'),
    (8, 'Computer Lab 1'),
    (9, 'Physics Lab');
go

-- Adding 4 Dummy Users for Instructors with Password Hash
EXEC dbo.AddUser 
    @UserId = 200001, 
    @UserEmail = 'johndoe@example.com', 
    @PasswordHash = '$2b$10$JzYXOl8zBRf7/.QKTNuoMO/4Z7P2fMgFi5skR09pU8VmJZ9fgkKZG', 
    @Role_Code = 2, -- Role Code for Instructor
    @IPAddress = '192.168.1.1', 
    @UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

EXEC dbo.AddUser 
    @UserId = 200002, 
    @UserEmail = 'janesmith@example.com', 
    @PasswordHash = '$2b$10$JzYXOl8zBRf7/.QKTNuoMO/4Z7P2fMgFi5skR09pU8VmJZ9fgkKZG', 
    @Role_Code = 2, -- Role Code for Instructor
    @IPAddress = '192.168.1.2', 
    @UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

EXEC dbo.AddUser 
    @UserId = 200003, 
    @UserEmail = 'markbrown@example.com', 
    @PasswordHash = '$2b$10$JzYXOl8zBRf7/.QKTNuoMO/4Z7P2fMgFi5skR09pU8VmJZ9fgkKZG', 
    @Role_Code = 2, -- Role Code for Instructor
    @IPAddress = '192.168.1.3', 
    @UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

EXEC dbo.AddUser 
    @UserId = 200004, 
    @UserEmail = 'emilydavis@example.com', 
    @PasswordHash = '$2b$10$JzYXOl8zBRf7/.QKTNuoMO/4Z7P2fMgFi5skR09pU8VmJZ9fgkKZG', 
    @Role_Code = 2, -- Role Code for Instructor
    @IPAddress = '192.168.1.4', 
    @UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';


-- Adding 20 Courses (5 each in Computer Science, Psychology, Economics, Mathematics)
EXEC dbo.AddCourse @CourseId = 3001, @CourseName = 'Intro to CS', @ClassRoomRequired = 1, @InstructorId = 200001, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 1, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3002, @CourseName = 'Advanced Algorithms', @ClassRoomRequired = 1, @InstructorId = 200001, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 2, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3003, @CourseName = 'Data Structures', @ClassRoomRequired = 0, @InstructorId = 200001, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 3, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3004, @CourseName = 'Machine Learning', @ClassRoomRequired = 1, @InstructorId = 200001, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 4, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3005, @CourseName = 'Operating Systems', @ClassRoomRequired = 0, @InstructorId = 200001, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 5, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddCourse @CourseId = 3006, @CourseName = 'Psych 101', @ClassRoomRequired = 1, @InstructorId = 200002, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 6, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3007, @CourseName = 'Cognitive Psychology', @ClassRoomRequired = 1, @InstructorId = 200002, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 7, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3008, @CourseName = 'Developmental Psych', @ClassRoomRequired = 0, @InstructorId = 200002, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 8, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3009, @CourseName = 'Clinical Psychology', @ClassRoomRequired = 1, @InstructorId = 200002, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 9, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3010, @CourseName = 'Neuropsychology', @ClassRoomRequired = 0, @InstructorId = 200002, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 1, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddCourse @CourseId = 3011, @CourseName = 'Intro to Economics', @ClassRoomRequired = 1, @InstructorId = 200003, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 2, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3012, @CourseName = 'Microeconomics', @ClassRoomRequired = 0, @InstructorId = 200003, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 3, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3013, @CourseName = 'Macroeconomics', @ClassRoomRequired = 1, @InstructorId = 200003, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 4, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3014, @CourseName = 'Game Theory', @ClassRoomRequired = 0, @InstructorId = 200003, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 5, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3015, @CourseName = 'Econometrics', @ClassRoomRequired = 1, @InstructorId = 200003, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 6, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddCourse @CourseId = 3016, @CourseName = 'Calculus I', @ClassRoomRequired = 1, @InstructorId = 200004, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 7, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3017, @CourseName = 'Linear Algebra', @ClassRoomRequired = 0, @InstructorId = 200004, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 8, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3018, @CourseName = 'Discrete Math', @ClassRoomRequired = 1, @InstructorId = 200004, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 9, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3019, @CourseName = 'Probability Theory', @ClassRoomRequired = 0, @InstructorId = 200004, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 1, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';
EXEC dbo.AddCourse @CourseId = 3020, @CourseName = 'Statistics', @ClassRoomRequired = 1, @InstructorId = 200004, @StartDate = '2024-10-01', @EndDate = '2025-07-15', @ClassRoomCode = 2, @UserId = 1001, @IPAddress = '192.168.1.1', @UserAgent = 'Mozilla/5.0';


-- Adding 4 Dummy Instructors with Realistic Parameters
EXEC dbo.AddInstructor 
    @UserId = 200001, 
    @FirstName = 'John', 
    @LastName = 'Doe', 
    @Phone = '0541234567', 
    @Major = 'Computer Science', 
    @EmploymentStartDate = '2024-08-01', 
    @Address = '123 Main St', 
    @City_Code = 9, 
    @ByUserId = 1001, 
    @IPAddress = '192.168.1.1';

EXEC dbo.AddInstructor 
    @UserId = 200002, 
    @FirstName = 'Jane', 
    @LastName = 'Smith', 
    @Phone = '0502345678', 
    @Major = 'Psychology', 
    @EmploymentStartDate = '2024-07-01', 
    @Address = '456 Elm St', 
    @City_Code = 3, 
    @ByUserId = 1001, 
    @IPAddress = '192.168.1.2';

EXEC dbo.AddInstructor 
    @UserId = 200003, 
    @FirstName = 'Mark', 
    @LastName = 'Brown', 
    @Phone = '0523456789', 
    @Major = 'Economics', 
    @EmploymentStartDate = '2024-06-15', 
    @Address = '789 Oak Ave', 
    @City_Code = 4, 
    @ByUserId = 1001, 
    @IPAddress = '192.168.1.3';

EXEC dbo.AddInstructor 
    @UserId = 200004, 
    @FirstName = 'Emily', 
    @LastName = 'Davis', 
    @Phone = '0534567890', 
    @Major = 'Mathematics', 
    @EmploymentStartDate = '2024-05-10', 
    @Address = '321 Pine St', 
    @City_Code = 8, 
    @ByUserId = 1001, 
    @IPAddress = '192.168.1.4';

--adding users- students
-- Adding Users for the Students

EXEC dbo.AddUser 
    @UserId = 100001,
    @UserEmail = 'noa.levi@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3, -- Assuming '2' is the role code for students
    @IPAddress = '192.168.1.1',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100002,
    @UserEmail = 'amit.cohen@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 2,
    @IPAddress = '192.168.1.2',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100003,
    @UserEmail = 'yonatan.mizrahi@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.3',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100004,
    @UserEmail = 'tamar.katz@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 2,
    @IPAddress = '192.168.1.4',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100005,
    @UserEmail = 'eitan.shapiro@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.5',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100006,
    @UserEmail = 'gal.barak@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.6',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100007,
    @UserEmail = 'or.tal@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.7',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100008,
    @UserEmail = 'shira.bendavid@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.8',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100009,
    @UserEmail = 'daniel.peretz@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.9',
    @UserAgent = 'Mozilla/5.0';

EXEC dbo.AddUser 
    @UserId = 100010,
    @UserEmail = 'lior.aviv@academiq.com',
    @PasswordHash = '$2b$10$z9vHs5fy1DoJ2FZ8bkPy8uWZ4/Ui3MRurAwLgSmfUIFs8P8nS8ZHG',
    @Role_Code = 3,
    @IPAddress = '192.168.1.10',
    @UserAgent = 'Mozilla/5.0';



	-- Adding Students with EXEC Commands
EXEC dbo.AddStudent 
    @UserId = 100001, 
    @FirstName = 'Noa', 
    @LastName = 'Levi', 
    @School_Year = 2, 
    @Major = 'Computer Science', 
    @Phone = '0541234567', 
    @Picture_URL = 'https://randomuser.me/api/portraits/women/1.jpg', 
    @Address = 'Herzl St 21, Tel Aviv', 
    @City_Code = 1, 
    @Enrollment = '2023-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100002, 
    @FirstName = 'Amit', 
    @LastName = 'Cohen', 
    @School_Year = 3, 
    @Major = 'Computer Science', 
    @Phone = '0547654321', 
    @Picture_URL = 'https://randomuser.me/api/portraits/men/2.jpg', 
    @Address = 'Ben Yehuda St 5, Jerusalem', 
    @City_Code = 2, 
    @Enrollment = '2022-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100003, 
    @FirstName = 'Yonatan', 
    @LastName = 'Mizrahi', 
    @School_Year = 1, 
    @Major = 'Psychology', 
    @Phone = '0521239876', 
    @Picture_URL = 'https://randomuser.me/api/portraits/men/3.jpg', 
    @Address = 'HaNassi Blvd 12, Haifa', 
    @City_Code = 3, 
    @Enrollment = '2023-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100004, 
    @FirstName = 'Tamar', 
    @LastName = 'Katz', 
    @School_Year = 2, 
    @Major = 'Psychology', 
    @Phone = '0503217654', 
    @Picture_URL = 'https://randomuser.me/api/portraits/women/4.jpg', 
    @Address = 'Rabin St 33, Rishon LeZion', 
    @City_Code = 4, 
    @Enrollment = '2022-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100005, 
    @FirstName = 'Eitan', 
    @LastName = 'Shapiro', 
    @School_Year = 1, 
    @Major = 'Computer Science', 
    @Phone = '0521112233', 
    @Picture_URL = 'https://randomuser.me/api/portraits/men/5.jpg', 
    @Address = 'HaPalmach St 15, Petah Tikva', 
    @City_Code = 5, 
    @Enrollment = '2023-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100006, 
    @FirstName = 'Gal', 
    @LastName = 'Barak', 
    @School_Year = 2, 
    @Major = 'Computer Science', 
    @Phone = '0533334444', 
    @Picture_URL = 'https://randomuser.me/api/portraits/women/6.jpg', 
    @Address = 'Sderot Yerushalayim, Ashdod', 
    @City_Code = 6, 
    @Enrollment = '2022-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100007, 
    @FirstName = 'Or', 
    @LastName = 'Tal', 
    @School_Year = 3, 
    @Major = 'Psychology', 
    @Phone = '0545556667', 
    @Picture_URL = 'https://randomuser.me/api/portraits/men/7.jpg', 
    @Address = 'HaRav Kook St 10, Netanya', 
    @City_Code = 7, 
    @Enrollment = '2021-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100008, 
    @FirstName = 'Shira', 
    @LastName = 'Ben David', 
    @School_Year = 1, 
    @Major = 'Psychology', 
    @Phone = '0554441234', 
    @Picture_URL = 'https://randomuser.me/api/portraits/women/8.jpg', 
    @Address = 'Derech Beersheba, Beersheba', 
    @City_Code = 8, 
    @Enrollment = '2023-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100009, 
    @FirstName = 'Daniel', 
    @LastName = 'Peretz', 
    @School_Year = 3, 
    @Major = 'Computer Science', 
    @Phone = '0547659876', 
    @Picture_URL = 'https://randomuser.me/api/portraits/men/9.jpg', 
    @Address = 'Shenkar St 8, Holon', 
    @City_Code = 9, 
    @Enrollment = '2021-10-01', 
    @ByUserId = 1001;

EXEC dbo.AddStudent 
    @UserId = 100010, 
    @FirstName = 'Lior', 
    @LastName = 'Aviv', 
    @School_Year = 2, 
    @Major = 'Psychology', 
    @Phone = '0543456789', 
    @Picture_URL = 'https://randomuser.me/api/portraits/women/10.jpg', 
    @Address = 'Herzl St 42, Hadera', 
    @City_Code = 10, 
    @Enrollment = '2022-10-01', 
    @ByUserId = 1001;


select * from users
go 