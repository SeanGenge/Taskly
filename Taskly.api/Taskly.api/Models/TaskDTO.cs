using System.ComponentModel.DataAnnotations;

namespace Taskly.api.Models
{
    public class TaskDTO
    {
        [Required]
        public required string Name { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? DateCompleted { get; set; }
        public bool? IsImportant { get; set; }
        public bool? IsCompleted { get; set; }
        public DateTime? DateCreated { get; set; }
        public int? PriorityId { get; set; }
    }
}
