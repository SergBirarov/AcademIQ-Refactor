using AcademIQ_backend.Data;
using AcademIQ_backend.Models.RequestModels;
using AcademIQ_backend.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AcademIQ_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly AppDbContext _context;

        public RegisterController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, AppDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost("register-staff")]
        public async Task<IActionResult> RegisterStaff([FromBody] RegisterStaffRequest request)
        {
            // Check if user already exists
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
                return BadRequest("User with this email already exists.");

            // Create IdentityUser for authentication
            var identityUser = new ApplicationUser
            {
                UserName = request.Email, // Required by Identity
                UserEmail = request.Email, // Maps to your custom email field
                PasswordHash = HashPassword(request.Password)
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Add to the "Staff" role
            await _userManager.AddToRoleAsync(identityUser, "Staff");

            // Add additional data to Staff table
            var staff = new Staff
            {
                StaffId = identityUser.Id, // Link with IdentityUser
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone,
                Email = request.Email,
                City_Code = request.City_Code
            };

            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();

            return Ok("Staff user registered successfully.");
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Helper method to verify passwords
        private static bool VerifyPassword(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }


    public class RegisterStaffRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public int City_Code { get; set; }
}
}
