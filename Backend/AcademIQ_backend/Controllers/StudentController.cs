using System.Threading.Tasks;
using AcademIQ_backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AcademIQ_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        // Get Student Profile by UserId
        //[Authorize]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetStudentProfile(int userId)
        {
            // Fetch the user with their student profile based on the provided UserId
            var user = await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.UserId == userId && u.Role_Code == 3);

            if (user == null)
            {
                return NotFound("Student not found.");
            }

            // Extract and structure the student's profile data
            var studentProfile = await _context.Students
                .Where(s => s.Id == userId)
                .Select(s => new
                {
                    s.Id,
                    s.FirstName,
                    s.LastName,
                    s.Email,
                    s.School_Year,
                    s.Phone,
                    s.UserImage,
                    s.Address,
                    s.City_Code,
                    s.Enrollment
                })
                .FirstOrDefaultAsync();

            if (studentProfile == null)
            {
                return NotFound("Student profile details not found.");
            }

            return Ok(studentProfile);
        }
    }
}
