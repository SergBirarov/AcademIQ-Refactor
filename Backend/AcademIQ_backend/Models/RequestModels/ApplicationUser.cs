using Microsoft.AspNetCore.Identity;

namespace AcademIQ_backend.Models.RequestModels
{
    public class ApplicationUser: IdentityUser<int>
    {
        public string UserEmail { get; set; }
        public string PasswordHash { get; set; }
        public int Role_Code { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpiration { get; set; }
    }
}
