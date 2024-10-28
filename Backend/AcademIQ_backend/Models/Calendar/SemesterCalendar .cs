using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Calendar
{
    public class SemesterCalendar
    {
        [Key]
        public int CalendarId { get; set; }
        public DateTime SemesterStartDate { get; set; }
        public DateTime SemesterEndDate { get; set; }
        public string? HolidayDates { get; set; } // JSON data stored as a string
    }
}
