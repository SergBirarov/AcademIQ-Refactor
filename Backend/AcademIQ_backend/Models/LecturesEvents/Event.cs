using AcademIQ_backend.Models.Calendar;
using AcademIQ_backend.Models.CoursesAll;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.LecturesEvents
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }
        public string? EventName { get; set; }
        public DateTime EventDate { get; set; }
        public string? Description { get; set; }
        public int? CourseId { get; set; }
        public int EventTypeCode { get; set; }

        // Navigation properties
        public EventTypes? EventType { get; set; }
        public Courses? Course { get; set; }
    }
}
