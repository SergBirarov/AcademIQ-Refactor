using System.ComponentModel.DataAnnotations;

namespace AcademIQ_backend.Models
{
    public class ClassRoomCode
    {
        [Key]
        public int ClassRoomId { get; set; }
        public string? ClassRoom { get; set; }

        
    }
}
