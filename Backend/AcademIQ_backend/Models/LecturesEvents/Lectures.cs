using AcademIQ_backend.Models.CoursesAll;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.LecturesEvents
{
    public class Lectures
    {
        [Key]
        public int LectureId { get; set; }
        public int CourseId { get; set; }
        public string? WeekDay { get; set; }
        public int ClassRoomCode { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        // Navigation properties
        public Courses? Course { get; set; }
    }
}
