//using AcademIQ_backend.Data;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;

//internal class Program
//{
//    private static void Main(string[] args)
//    {
//        var builder = WebApplication.CreateBuilder(args);
//        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//        builder.Services.AddDbContext<AppDbContext>(options =>
//            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


//        builder.Services.AddCors(options =>
//        {
//            options.AddPolicy(name: MyAllowSpecificOrigins,
//                              policy =>
//                              {
//                                  policy.WithOrigins("http://localhost:5173/") //  frontend
//                                        .AllowAnyHeader()
//                                        .AllowAnyMethod();

//                              });
//        });

//        // Add services to the container.
//        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = builder.Configuration["Jwt:Issuer"],
//            ValidAudience = builder.Configuration["Jwt:Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//        };
//    });

//        builder.Services.AddAuthorization(); 

//        // Add Controllers (API endpoints)
//        builder.Services.AddControllers();


//        var app = builder.Build();

//        // Configure the HTTP request pipeline.
//        if (app.Environment.IsDevelopment())
//        {
//            app.UseSwagger();
//            app.UseSwaggerUI();
//        }

//        app.UseHttpsRedirection();

//        // Add this to enable CORS
//        app.UseCors(MyAllowSpecificOrigins); 

//        app.UseAuthentication();
//        app.UseAuthorization();

//        app.MapControllers();

//        app.Run();
//    }
//}


using AcademIQ_backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AcademIQ_backend
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:5173") 
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                  });
            });

            // Add Authentication services (JWT)
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "default_secret_key"))
                    };
                });

            // Add Authorization services
            builder.Services.AddAuthorization(); // <--- This is what you are missing

            // Add Controllers (API endpoints)
            builder.Services.AddControllers();

            // Add Swagger for API documentation (only for development environment)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Enable CORS
            app.UseCors(MyAllowSpecificOrigins);

            // Use Authentication & Authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();

            // Map Controllers (API routes)
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}