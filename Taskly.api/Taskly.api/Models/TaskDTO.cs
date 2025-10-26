using System.ComponentModel.DataAnnotations;

namespace Taskly.api.Models
{
    public class TaskDTO
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public required string Name { get; set; }
        [StringLength(5000)]
        public string? Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DueDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DateCompleted { get; set; }
        public bool? IsImportant { get; set; }
        public bool? IsCompleted { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DateCreated { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int PriorityId { get; set; }
    }
}
