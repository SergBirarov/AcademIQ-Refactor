namespace AcademIQ_backend.Models.RequestModels
{
    public class MyLoginRequest
    {
        public required int Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
