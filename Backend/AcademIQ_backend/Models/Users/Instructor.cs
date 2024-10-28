using AcademIQ_backend.Models.CoursesAll;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Users
{
    public class Instructors
    {
        [Key]
        public int InstructorId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Major { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public string? Address { get; set; }
        public int City_Code { get; set; }

        // Navigation Property
        public Cities? City_Name { get; set; }
        public ICollection<Courses>? Courses { get; set; }
        public ICollection<CoursesOnAir> CoursesOnAir { get; set; } = new List<CoursesOnAir>();

    }
}
