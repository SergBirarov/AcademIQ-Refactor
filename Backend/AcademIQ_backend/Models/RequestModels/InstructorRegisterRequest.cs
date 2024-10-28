namespace AcademIQ_backend.Models.RequestModels
{
    public class InstructorRegisterRequest : MyRegisterRequest
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Address { get; set; }
        public required int City_Code { get; set; }
        public required string Major { get; set; } // Specific to instructors
        public required DateTime EmploymentStartDate { get; set; } // Specific to instructors
    }
}
