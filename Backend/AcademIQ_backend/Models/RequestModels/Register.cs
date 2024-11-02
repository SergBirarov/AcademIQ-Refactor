namespace AcademIQ_backend.Models.RequestModels
{
    public class Register
    {
        public int UserId { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
