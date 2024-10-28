using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models.Users
{
    public class Users
    {
        [Key]
        public required int UserId { get; set; }
        public required string UserEmail { get; set; }
        public required string PasswordHash { get; set; }
        public required short Role_Code { get; set; }

        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpiration { get; set; }

        // Navigation properties
        public Roles? Role { get; set; }  // Nullable if Role may be missing


    }
}
