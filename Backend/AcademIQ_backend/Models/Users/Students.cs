using AcademIQ_backend.Models.CoursesAll;
using AcademIQ_backend.Models.ExamsAssignments;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Users
{
    public class Students
    {
        [Key]
        public required int StudentId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required short School_Year { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public string? Picture_URL { get; set; }
        public string? Address { get; set; }
        public int? City_Code { get; set; }
        public DateTime? Enrollment { get; set; }

        // Navigation properties
        public int UserId { get; set; }
        public Cities? City_Name { get; set; }
        public Users? User { get; set; }

        public ICollection<ActiveStudentAssignments> ActiveStudentAssignments { get; set; } = new List<ActiveStudentAssignments>();
        public ICollection<ActiveStudentExamGrades> ActiveStudentExamGrades { get; set; } = new List<ActiveStudentExamGrades>();

    }
}
