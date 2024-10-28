using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AcademIQ_backend.Models.Users
{
    public class Staff
    {
        [Key]
        public int StaffId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public short Role_Code { get; set; }
        public int City_Code { get; set; }

        // Navigation properties
        public Cities? City_Name { get; set; }
        public Roles? Role { get; set; }
    }
}
