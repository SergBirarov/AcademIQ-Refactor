using AcademIQ_backend.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.CoursesAll
{
    public class ActiveStudentCourses
    {
        [Key]
        public int Id { get; set; }
        public int CourseId { get; set; }

        // Navigation Properties
        public virtual Students? Student { get; set; }
        public virtual Courses? Course { get; set; }
    }
}
