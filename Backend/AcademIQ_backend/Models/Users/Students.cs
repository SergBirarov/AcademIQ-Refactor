using AcademIQ_backend.Models.CoursesAll;
using AcademIQ_backend.Models.ExamsAssignments;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Users
{
    public class Students
    {
        [Key]
        public required int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int School_Year { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public string? UserImage { get; set; }
        public required string Address { get; set; }
        public required int City_Code { get; set; }
        public DateTime Enrollment { get; set; }

        // Navigation properties
        public Cities? City_Name { get; set; }
        public ICollection<ActiveStudentCourses>? ActiveStudentCourses { get; set; }
        public ICollection<ActiveStudentAssignments>? ActiveStudentAssignments { get; set; }
        public ICollection<ActiveStudentExamGrades>? ActiveStudentExamGrades { get; set; }
        public ICollection<CoursesOnAir> CoursesOnAir { get; set; } = new List<CoursesOnAir>();

    }
}
