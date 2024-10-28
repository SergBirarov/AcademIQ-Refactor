using Azure.Identity;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Calendar
{
    public class CalendarEvents
    {
        //private EventId eventId;
        [Key]
        public int EventId { get; set; }
        public required string EventName { get; set; }
        public DateTime EventDate { get; set; }
        public int EventType { get; set; }
        public int CourseId { get; set; }
        public string? Description { get; set; }

        
    }
}
