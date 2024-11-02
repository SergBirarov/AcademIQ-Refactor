using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AcademIQ_backend.Models.Users
{
    public class Staff
    {
        [Key]
        public required int StaffId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int City_Code { get; set; }

        // Foreign Key
        public int? UserId { get; set; }

        // Navigation properties
        public Users? User { get; set; }
        public Cities? City_Name { get; set; }
        public Roles? Role { get; set; }
    }
}
