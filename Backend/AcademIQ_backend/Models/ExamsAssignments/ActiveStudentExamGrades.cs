using AcademIQ_backend.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.ExamsAssignments
{
    public class ActiveStudentExamGrades
    {
        [Key]
        public int StudentId { get; set; }
        public int ExamId { get; set; }
        public DateTime ExamDate { get; set; }
        public int Grade { get; set; }

        public virtual Students? Student { get; set; }
        public virtual Exams Exam { get; set; }

    }
}
