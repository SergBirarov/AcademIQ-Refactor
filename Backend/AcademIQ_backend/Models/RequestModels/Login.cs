namespace AcademIQ_backend.Models.RequestModels
{
    public class Login
    {
        public int UserId { get; set; }
        public string Password { get; set; } = string.Empty;

    }
}
