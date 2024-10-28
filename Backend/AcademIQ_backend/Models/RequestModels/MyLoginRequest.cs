namespace AcademIQ_backend.Models.RequestModels
{
    public class MyLoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
