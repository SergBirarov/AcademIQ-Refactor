using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.ExamsAssignments
{
    public class ExamTypes
    {
        [Key]
        public int ExamTypeId { get; set; }
        public string? ExamTypeName { get; set; }
    }
}
