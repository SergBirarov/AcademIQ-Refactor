namespace AcademIQ_backend.Models.Users
{
    public class UserProfileResponse
    {
        // General user properties
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public int Role_Code { get; set; }
        public string Role_Desc { get; set; }

        // Role-specific properties
        public StudentProfileResponse? StudentProfile { get; set; }
        public InstructorProfileResponse? InstructorProfile { get; set; }
        public StaffProfileResponse? StaffProfile { get; set; }
    }

    public class StudentProfileResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int School_Year { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string UserImage { get; set; }
        public string Address { get; set; }
        public int City_Code { get; set; }
        public DateTime Enrollment { get; set; }
    }

    public class InstructorProfileResponse
    {
        public int InstructorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Major { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public string Address { get; set; }
        public int City_Code { get; set; }
    }

    public class StaffProfileResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int Role_Code { get; set; }
        public int City_Code { get; set; }
    }

}
