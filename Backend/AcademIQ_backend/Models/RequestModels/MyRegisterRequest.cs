using System.ComponentModel.DataAnnotations.Schema;

namespace AcademIQ_backend.Models.RequestModels
{
    public class MyRegisterRequest
    {
        public required int  UserId { get; set; }           
        public required string UserEmail { get; set; }     
        public required string Password { get; set; }
        public required short Role_Code { get; set; }


    }
}
