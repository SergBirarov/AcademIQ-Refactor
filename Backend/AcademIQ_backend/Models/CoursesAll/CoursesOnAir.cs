using AcademIQ_backend.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.CoursesAll
{
    public class CoursesOnAir
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int InstructorId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? ClassRoomCode { get; set; }

        // Navigation Properties
        public virtual Students? Student { get; set; }
        public virtual Courses? Course { get; set; }
        public virtual Instructors? Instructor { get; set; }
        public ClassRoomCode? ClassRoom { get; set; }

    }
}
