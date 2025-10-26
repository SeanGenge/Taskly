using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Eventing.Reader;

namespace Taskly.api.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        [MinLength(1, ErrorMessage = "The Task Name cannot be empty.")]
        public required string Name {  get; set; }
        [MaxLength(5000)]
        public required string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? DateCompleted { get; set; }
        public bool IsImportant { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime DateCreated { get; set; }
        public int PriorityId { get; set; }

        public virtual Priority? Priority { get; set; }
    }
}
