using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Users
{
    public class Roles
    {
        [Key]
        public required short Role_Code { get; set; }
        public required string Role_Desc { get; set; }

        // Navigation properties
        public ICollection<Staff>? Staff { get; set; }
        public ICollection<Users>? Users { get; set; }
    }
}
