using AcademIQ_backend.Models.CoursesAll;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Users
{
    public class Instructors
    {
        [Key]
        public required int InstructorId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public string? Major { get; set; }
        public required DateTime EmploymentStartDate { get; set; }
        public string? Address { get; set; }
        public int? City_Code { get; set; }


        // Foreign Key
        public int? UserId { get; set; }

        // Navigation Property
        public Users? User { get; set; }
        public Cities? City_Name { get; set; }
        public ICollection<Courses>? Courses { get; set; }
        public ICollection<CoursesOnAir> CoursesOnAir { get; set; } = new List<CoursesOnAir>();

    }
}
