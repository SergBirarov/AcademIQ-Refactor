using AcademIQ_backend.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.ExamsAssignments
{
    public class ActiveStudentAssignments
    {
        [Key]
        public int StudentId { get; set; }
        public int AssignmentId { get; set; }
        public string? SubmissionStatus { get; set; }
        public DateTime? SubmissionTimestamp { get; set; }
        public int? Grade { get; set; }

        // Navigation Properties
        public virtual Students? Student { get; set; }
        public virtual Assignments? Assignment { get; set; }
    }
}
