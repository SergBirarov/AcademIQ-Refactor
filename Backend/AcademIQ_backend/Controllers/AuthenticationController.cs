using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AcademIQ_backend.Data;
using AcademIQ_backend.Models.RequestModels;
using AcademIQ_backend.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
namespace AcademIQ_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        [HttpPost("register/student")]
        public async Task<IActionResult> RegisterStudent([FromBody] StudentRegisterRequest model)
        {
            // Check if the email is already registered
            if (await _context.Users.AnyAsync(u => u.UserEmail == model.UserEmail))
            {
                return BadRequest("User with this email already exists.");
            }

            // Hash the password
            var hashedPassword = HashPassword(model.Password);

            // Create a new User object
            var user = new Users
            {
                UserId = model.UserId,
                UserEmail = model.UserEmail,
                PasswordHash = hashedPassword,
                Role_Code = 3 // Student role code
            };

            // Add the user to the Users table
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create and add a Student profile
            var student = new Students
            {
                Id = user.UserId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.UserEmail,
                School_Year = model.School_Year,
                Phone = model.Phone,
                Address = model.Address,
                City_Code = model.City_Code
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return Ok("Student registered successfully.");
        }


        // User Registration
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] MyRegisterRequest model)
        {
            // Check if the email is already registered
            if (await _context.Users.AnyAsync(u => u.UserEmail == model.UserEmail))
            {
                return BadRequest("User with this email already exists.");
            }

            // Hash the password
            var hashedPassword = HashPassword(model.Password);

            // Create a new User object
            var user = new Users
            {
                UserId = model.UserId,
                UserEmail = model.UserEmail,
                PasswordHash = hashedPassword,
                Role_Code = model.Role_Code
            };

            // Add the user to the Users table
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Add user-specific data to the relevant table based on Role_Code
            switch (model.Role_Code)
            {
                case 3: // Student role
                    if (model is StudentRegisterRequest studentModel)
                    {
                        var student = new Students
                        {
                            Id = user.UserId,
                            FirstName = studentModel.FirstName,
                            LastName = studentModel.LastName,
                            Email = studentModel.UserEmail,
                            School_Year = studentModel.School_Year,
                            Phone = studentModel.Phone,
                            Address = studentModel.Address,
                            City_Code = studentModel.City_Code
                        };
                        _context.Students.Add(student);
                    }
                    break;

                case 2: // Instructor role
                    if (model is InstructorRegisterRequest instructorModel)
                    {
                        var instructor = new Instructors
                        {
                            InstructorId = user.UserId,
                            FirstName = instructorModel.FirstName,
                            LastName = instructorModel.LastName,
                            Email = instructorModel.UserEmail,
                            Phone = instructorModel.Phone,
                            Major = instructorModel.Major,
                            EmploymentStartDate = instructorModel.EmploymentStartDate,
                            Address = instructorModel.Address,
                            City_Code = instructorModel.City_Code
                        };
                        _context.Instructors.Add(instructor);
                    }
                    break;

                default:
                    return BadRequest("Invalid Role Code.");
            }

            // Save the changes to the respective tables
            await _context.SaveChangesAsync();

            return Ok("User and Profile registered successfully.");
        }


        [HttpPost("register/instructor")]
        public async Task<IActionResult> RegisterInstructor([FromBody] InstructorRegisterRequest model)
        {
            // Check if the email is already registered
            if (await _context.Users.AnyAsync(u => u.UserEmail == model.UserEmail))
            {
                return BadRequest("User with this email already exists.");
            }

            // Hash the password
            var hashedPassword = HashPassword(model.Password);

            // Create a new User object
            var user = new Users
            {
                UserId = model.UserId,
                UserEmail = model.UserEmail,
                PasswordHash = hashedPassword,
                Role_Code = 2 // Instructor role code
            };

            // Add the user to the Users table
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create and add an Instructor profile
            var instructor = new Instructors
            {
                InstructorId = user.UserId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.UserEmail,
                Phone = model.Phone,
                Major = model.Major,
                EmploymentStartDate = model.EmploymentStartDate,
                Address = model.Address,
                City_Code = model.City_Code
            };

            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();

            return Ok("Instructor registered successfully.");
        }


        // User Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] MyLoginRequest model)
        {

            var user = await _context.Users
       .Include(u => u.Role)  // Include Role to access Role_Desc
       .FirstOrDefaultAsync(u => u.UserEmail == model.Email);

            if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Generate the JWT token
            var token = GenerateJwtToken(user);

            // Initialize the response model with general user info
            var response = new UserProfileResponse
            {
                UserId = user.UserId,
                UserEmail = user.UserEmail,
                Role_Code = user.Role_Code,
                Role_Desc = user.Role ?.Role_Desc ?? "Unknown"
            };

            //// Fetch additional profile data based on the user role
            //switch (user.Role_Code)
            //{
            //    case 3: // Student
            //        var student = await _context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Id == user.UserId);
            //        if (student != null)
            //        {
            //            response.StudentProfile = new StudentProfileResponse
            //            {
            //                Id = student.Id,
            //                FirstName = student.FirstName,
            //                LastName = student.LastName,
            //                School_Year = student.School_Year,
            //                Phone = student.Phone,
            //                Email = student.Email,
            //                UserImage = student.UserImage ?? "No Image",
            //                Address = student.Address,
            //                City_Code = student.City_Code,
            //                Enrollment = student.Enrollment
            //            };
            //        }
            //        break;

            //    case 2: // Instructor
            //        var instructor = await _context.Instructors.SingleOrDefaultAsync(i => i.InstructorId == user.UserId);
            //        if (instructor != null)
            //        {
            //            response.InstructorProfile = new InstructorProfileResponse
            //            {
            //                InstructorId = instructor.InstructorId,
            //                FirstName = instructor.FirstName,
            //                LastName = instructor.LastName,
            //                Phone = instructor.Phone,
            //                Email = instructor.Email,
            //                Major = instructor.Major,
            //                EmploymentStartDate = instructor.EmploymentStartDate,
            //                Address = instructor.Address,
            //                City_Code = instructor.City_Code
            //            };
            //        }
            //        break;

            //    case 1: // Staff
            //        var staff = await _context.Staff.SingleOrDefaultAsync(s => s.StaffId == user.UserId);
            //        if (staff != null)
            //        {
            //            response.StaffProfile = new StaffProfileResponse
            //            {
            //                FirstName = staff.FirstName,
            //                LastName = staff.LastName,
            //                Phone = staff.Phone,
            //                Email = staff.Email,
            //                Role_Code = staff.Role_Code,
            //                City_Code = staff.City_Code
            //            };
            //        }
            //        break;

            //    default:
            //        return BadRequest("User role not recognized.");
            //}

            // Return the token along with user profile data
            return Ok(new
            {
                Token = token,
                UserProfile = response
            });


            //var user = await _context.Users.SingleOrDefaultAsync(u => u.UserEmail == model.Email);

            //if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
            //{
            //    return Unauthorized("Invalid email or password.");
            //}

            //var token = GenerateJwtToken(user);
            //return Ok(new { Token = token });
        }


        // Password Reset
        //[HttpPost("forgot-password")]
        //public async Task<IActionResult> ForgotPassword([FromBody] MyForgotPasswordRequest model)
        //{
        //    var user = await _context.Users.SingleOrDefaultAsync(u => u.UserEmail == model.Email);
        //    if (user == null)
        //    {
        //        return BadRequest("No user associated with this email.");
        //    }

        //    // Generate a password reset token (could be a simple GUID or other logic)
        //    var resetToken = Guid.NewGuid().ToString();
        //    user.PasswordResetToken = resetToken;
        //    user.PasswordResetTokenExpiration = DateTime.UtcNow.AddHours(1);

        //    await _context.SaveChangesAsync();

        //    // Send email with reset token (send email logic needed)
        //    // e.g., SendPasswordResetEmail(user.Email, resetToken);

        //    return Ok("Password reset link sent.");
        //}

        // Confirm Reset Password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] MyResetPasswordRequest model)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.PasswordResetToken == model.Token);
            if (model == null || string.IsNullOrWhiteSpace(model.Token) || string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest("Invalid password reset request.");
            }

            // Update password
            user.PasswordHash = HashPassword(model.NewPassword);
            user.PasswordResetToken = null; 
            user.PasswordResetTokenExpiration = null;

            await _context.SaveChangesAsync();

            return Ok("Password has been reset.");
        }

        // Helper method to generate JWT

        private static ClaimsIdentity GenerateClaims(Users user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (user.UserEmail == null) throw new InvalidOperationException("User email is missing.");

            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.Name, user.UserEmail));
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()));

            // Access Role_Desc from the related Roles entity
            var roleDescription = user.Role?.Role_Desc ?? "Unknown";
            claims.AddClaim(new Claim(ClaimTypes.Role, roleDescription));

            return claims;
        }
        private string GenerateJwtToken(Users user)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT Key is missing in configuration."));
            var credentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = GenerateClaims(user),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = credentials,
            };

            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }

      




        // Helper method to hash passwords
        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Helper method to verify passwords
        private static bool VerifyPassword(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }


        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetUserProfile()
        {
            // Get the logged-in user's ID from the JWT claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest("User ID is missing from token.");
            }

            // Fetch the user based on the UserId, including the Role entity
            var user = await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.UserId == int.Parse(userId));

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Initialize the response model with general user info
            var response = new UserProfileResponse
            {
                UserId = user.UserId,
                UserEmail = user.UserEmail,
                Role_Code = user.Role_Code,
                Role_Desc = user.Role?.Role_Desc ?? "Unknown"
            };

            // Check the user's role and include the respective profile information
            switch (user.Role_Code)
            {
                case 3: // Student
                    var student = await _context.Students.SingleOrDefaultAsync(s => s.Id == user.UserId);
                    if (student != null)
                    {
                        response.StudentProfile = new StudentProfileResponse
                        {
                            Id = student.Id,
                            FirstName = student.FirstName,
                            LastName = student.LastName,
                            School_Year = student.School_Year,
                            Phone = student.Phone,
                            Email = student.Email,
                            UserImage = student.UserImage?? "No Image",
                            Address = student.Address,
                            City_Code = student.City_Code,
                            Enrollment = student.Enrollment
                        };
                    }
                    break;

                case 2: // Instructor
                    var instructor = await _context.Instructors.SingleOrDefaultAsync(i => i.InstructorId == user.UserId);
                    if (instructor != null)
                    {
                        response.InstructorProfile = new InstructorProfileResponse
                        {
                            InstructorId = instructor.InstructorId,
                            FirstName = instructor.FirstName,
                            LastName = instructor.LastName,
                            Phone = instructor.Phone,
                            Email = instructor.Email,
                            Major = instructor.Major,
                            EmploymentStartDate = instructor.EmploymentStartDate,
                            Address = instructor.Address,
                            City_Code = instructor.City_Code
                        };
                    }
                    break;

                case 1: // Staff
                    var staff = await _context.Staff.SingleOrDefaultAsync(s => s.StaffId == user.UserId);
                    if (staff != null)
                    {
                        response.StaffProfile = new StaffProfileResponse
                        {
                            FirstName = staff.FirstName,
                            LastName = staff.LastName,
                            Phone = staff.Phone,
                            Email = staff.Email,
                            Role_Code = staff.Role_Code,
                            City_Code = staff.City_Code
                        };
                    }
                    break;

                default:
                    return BadRequest("User role not recognized.");
            }

            return Ok(response);
        }
    }
}
