namespace AcademIQ_backend.Models.RequestModels
{
    public class StudentRegisterRequest : MyRegisterRequest
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Address { get; set; }
        public required int City_Code { get; set; }
        public required int School_Year { get; set; } // Specific to students
    }
}
