using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Eventing.Reader;

namespace Taskly.api.Models
{
    public class TodoItem
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(200)]
        [Required]
        public required string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime Time { get; set; }
    }
}
