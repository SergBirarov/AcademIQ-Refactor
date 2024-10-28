using AcademIQ_backend.Models.Calendar;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.LecturesEvents
{
    public class EventTypes
    {
        [Key]
        public int EventCode { get; set; }
        public string? Type { get; set; }

        public ICollection<Event>? CalendarEvents { get; set; }

    }
}
