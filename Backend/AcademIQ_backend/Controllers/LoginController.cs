using AcademIQ_backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AcademIQ_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        public LoginController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return Unauthorized("Invalid email or password.");

            // Get the user’s role
            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Count == 0)
                return Unauthorized("User role not assigned.");

            var role = roles[0];
            dynamic userData;

            // Retrieve role-specific data
            if (role == "Student")
                userData = await _context.Students.SingleOrDefaultAsync(s => s.UserId.ToString() == user.Id);
            else if (role == "Instructor")
                userData = await _context.Instructors.SingleOrDefaultAsync(i => i.UserId.ToString() == user.Id);
            else if (role == "Staff")
                userData = await _context.Staff.SingleOrDefaultAsync(st => st.UserId.ToString() == user.Id);
            else
                return Unauthorized("Invalid role.");

            // Generate JWT token
            var token = GenerateJwtToken(user.Id, role);

            return Ok(new { Token = token, User = userData });
        }

        private string GenerateJwtToken(string userId, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(ClaimTypes.Role, role)
        };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                //expires: DateTime.UtcNow.AddHours(double.Parse(_configuration["Jwt:TokenExpiryInHours"])),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

