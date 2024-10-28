using AcademIQ_backend.Models.CoursesAll;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.ExamsAssignments
{
    public class Exams
    {
        [Key]
        public int ExamId { get; set; }
        public int CourseId { get; set; }
        public DateTime ExamDate { get; set; }
        public int ExamTypeId { get; set; }
        public string? Description { get; set; }

        // Navigation Properties
        public virtual Courses? Course { get; set; }
        public virtual ExamTypes? ExamType { get; set; }
    }
}
