using AcademIQ_backend.Models.CoursesAll;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.ExamsAssignments
{
    public class Assignments
    {
        [Key]
        public int AssignmentId { get; set; }
        public int CourseId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsVisible { get; set; }

        // Navigation Property
        public virtual Courses? Course { get; set; }
    }
}
