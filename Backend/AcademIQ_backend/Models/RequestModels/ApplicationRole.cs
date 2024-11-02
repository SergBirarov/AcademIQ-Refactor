using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace AcademIQ_backend.Models.RequestModels
{
    public class ApplicationRole : IdentityRole<int>
    {
        public string Role_Desc { get; set; } = string.Empty;
    }
}
