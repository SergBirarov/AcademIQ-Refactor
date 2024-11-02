using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AcademIQ_backend.Models.Users;
using AcademIQ_backend.Models.ExamsAssignments;
using AcademIQ_backend.Models.CoursesAll;
using AcademIQ_backend.Models.Calendar;
using AcademIQ_backend.Models.LecturesEvents;
using AcademIQ_backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AcademIQ_backend.Models.RequestModels;
using Microsoft.AspNetCore.Identity;

namespace AcademIQ_backend.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<ApplicationUser> Users { get; set; }  // Maps to your existing Users table
        public DbSet<ApplicationRole> Roles { get; set; }  // Maps to your existing Roles table


        //Entities
        public  DbSet<Users> AppUsers { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Students> Students { get; set; }
        public DbSet<Instructors> Instructors { get; set; }
        public  DbSet<Roles> AppRoles { get; set; }


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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Primary Key and Foreign Key Relationships

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(u => u.Id); // Maps to UserId in your Users table
                entity.Property(u => u.UserEmail).HasColumnName("UserEmail");
                entity.Property(u => u.PasswordHash).HasColumnName("PasswordHash");
                entity.Property(u => u.Role_Code).HasColumnName("Role_Code");
                entity.Property(u => u.PasswordResetToken).HasColumnName("PasswordResetToken");
                entity.Property(u => u.PasswordResetTokenExpiration).HasColumnName("PasswordResetTokenExpiration");
            });

            modelBuilder.Entity<ApplicationRole>(entity =>
            {
                entity.ToTable("Roles");
                entity.HasKey(r => r.Id); // Maps to Role_Code in your Roles table
                entity.Property(r => r.Role_Desc).HasColumnName("Role_Desc");
            });


            modelBuilder.Entity<Users>()
        .HasOne(u => u.Role)
        .WithMany(r => r.Users)
        .HasForeignKey(u => u.Role_Code)
        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Students>()
                .HasOne(s => s.User)
                .WithOne(u => u.Student)
                .HasForeignKey<Students>(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Instructors>()
                .HasOne(i => i.User)
                .WithOne(u => u.Instructor)
                .HasForeignKey<Instructors>(i => i.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Staff>()
                .HasOne(st => st.User)
                .WithOne(u => u.Staff)
                .HasForeignKey<Staff>(st => st.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // ActiveStudentAssignments relationship with Students
            modelBuilder.Entity<ActiveStudentAssignments>()
                .HasKey(a => new { a.StudentId, a.AssignmentId });

            modelBuilder.Entity<ActiveStudentAssignments>()
                .HasOne(a => a.Student)
                .WithMany(s => s.ActiveStudentAssignments)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Restrict);  // Adjust the delete behavior if needed

            modelBuilder.Entity<ActiveStudentAssignments>()
                .HasOne(a => a.Assignment)
                .WithMany()
                .HasForeignKey(a => a.AssignmentId);

            // ActiveStudentExamGrades relationship with Students
            modelBuilder.Entity<ActiveStudentExamGrades>()
                .HasKey(e => new { e.StudentId, e.ExamId });

            modelBuilder.Entity<ActiveStudentExamGrades>()
                .HasOne(e => e.Student)
                .WithMany(s => s.ActiveStudentExamGrades)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);  // Adjust the delete behavior if needed

            modelBuilder.Entity<ActiveStudentExamGrades>()
                .HasOne(e => e.Exam)
                .WithMany()
                .HasForeignKey(e => e.ExamId);






        }


    }

}
