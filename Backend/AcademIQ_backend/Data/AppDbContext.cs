using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AcademIQ_backend.Models.Users;
using AcademIQ_backend.Models.ExamsAssignments;
using AcademIQ_backend.Models.CoursesAll;
using AcademIQ_backend.Models.Calendar;
using AcademIQ_backend.Models.LecturesEvents;
using AcademIQ_backend.Models;

namespace AcademIQ_backend.Data
{
    public class AppDbContext : DbContext
    {
        //Entities
        public DbSet<Users> Users { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Students> Students { get; set; }
        public DbSet<Instructors> Instructors { get; set; }
        public DbSet<Roles> Roles { get; set; }


        //Courses All
        public DbSet<CoursesOnAir> CoursesOnAir { get; set; }
        public DbSet<Courses> Courses { get; set; }
        public DbSet<ActiveStudentCourses> ActiveStudentCourses { get; set; }

        //examsAssignments
        public DbSet<Assignments> Assignments { get; set; }
        public DbSet<ActiveStudentAssignments> ActiveStudentAssignments { get; set; }
        public DbSet<ActiveStudentExamGrades> ActiveStudentExamGrades { get; set; }
        public DbSet<Exams> Exams { get; set; }
        public DbSet<ExamTypes> ExamTypes { get; set; }

        //lecturesEvents
        public DbSet<Lectures> Lectures { get; set; }
        public DbSet<EventTypes> EventTypes { get; set; }
        public DbSet<Event> Event { get; set; }


        //calendar
        public DbSet<CalendarEvents> CalendarEvents { get; set; }
        public DbSet<SemesterCalendar> SemesterCalendar { get; set; }

        //misc

        public DbSet<Cities> Cities { get; set; }
        public DbSet<ClassRoomCode> ClassRoomCode { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Defining composite keys for many-to-many relationships
            modelBuilder.Entity<ActiveStudentCourses>()
                .HasKey(asc => new { asc.Id, asc.CourseId });

            modelBuilder.Entity<ActiveStudentAssignments>()
                .HasKey(asa => new { asa.StudentId, asa.AssignmentId });

            modelBuilder.Entity<ActiveStudentExamGrades>()
                .HasKey(aeg => new { aeg.StudentId, aeg.ExamId });

            // Defining composite key for CoursesOnAir
            modelBuilder.Entity<CoursesOnAir>()
                .HasKey(coa => new { coa.Id, coa.CourseId, coa.InstructorId, coa.StartDate });

            // Defining relationships for Students and Courses (Many-to-Many)
            modelBuilder.Entity<ActiveStudentCourses>()
                .HasOne(asc => asc.Student)
                .WithMany(s => s.ActiveStudentCourses)
                .HasForeignKey(asc => asc.Id);

            modelBuilder.Entity<ActiveStudentCourses>()
                .HasOne(asc => asc.Course)
                .WithMany(c => c.ActiveStudentCourses)
                .HasForeignKey(asc => asc.CourseId);

            // Defining relationships for Assignments and Courses (One-to-Many)
            modelBuilder.Entity<Assignments>()
                .HasOne(a => a.Course)
                .WithMany(c => c.Assignments)
                .HasForeignKey(a => a.CourseId);

            // Defining relationships for Exams and Courses (One-to-Many)
            modelBuilder.Entity<Exams>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Exams)
                .HasForeignKey(e => e.CourseId);

            modelBuilder.Entity<Exams>()
                .HasOne(e => e.ExamType)
                .WithMany()
                .HasForeignKey(e => e.ExamTypeId);

            // Relationships for Events
            modelBuilder.Entity<Event>()
                .HasOne(e => e.EventType)
                .WithMany(et => et.CalendarEvents)
                .HasForeignKey(e => e.EventTypeCode);

            modelBuilder.Entity<Event>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Event)
                .HasForeignKey(e => e.CourseId);

            // Relationships for CoursesOnAir
            modelBuilder.Entity<CoursesOnAir>()
                .HasOne(coa => coa.Student)
                .WithMany(s => s.CoursesOnAir)
                .HasForeignKey(coa => coa.Id);

            modelBuilder.Entity<CoursesOnAir>()
                .HasOne(coa => coa.Course)
                .WithMany(c => c.CoursesOnAir)
                .HasForeignKey(coa => coa.CourseId);

            modelBuilder.Entity<CoursesOnAir>()
                .HasOne(coa => coa.Instructor)
                .WithMany(i => i.CoursesOnAir)
                .HasForeignKey(coa => coa.InstructorId);

            // Cities relationships
            modelBuilder.Entity<Students>()
                .HasOne(s => s.City_Name)
                .WithMany(c => c.Students)
                .HasForeignKey(s => s.City_Code);

            modelBuilder.Entity<Instructors>()
                .HasOne(i => i.City_Name)
                .WithMany(c => c.Instructors)
                .HasForeignKey(i => i.City_Code);

            modelBuilder.Entity<Staff>()
                .HasOne(s => s.City_Name)
                .WithMany(c => c.Staff)
                .HasForeignKey(s => s.City_Code);

            // Role relationships with Staff
            modelBuilder.Entity<Staff>()
                .HasOne(s => s.Role)
                .WithMany(r => r.Staff)
                .HasForeignKey(s => s.Role_Code);

            modelBuilder.Entity<Users>()
    .HasOne(u => u.Role)
    .WithMany(r => r.Users)
    .HasForeignKey(u => u.Role_Code);







        }


    }

}
