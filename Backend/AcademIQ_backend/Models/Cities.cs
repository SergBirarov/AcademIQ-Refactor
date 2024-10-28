using AcademIQ_backend.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models
{
    public class Cities
    {
        [Key]
        public int City_Code { get; set; }
        public string? City_Name { get; set; }

        // Navigation Properties
        public virtual ICollection<Students>? Students { get; set; }
        public virtual ICollection<Instructors>? Instructors { get; set; }
        public ICollection<Staff>? Staff { get; set; }

    }
}
