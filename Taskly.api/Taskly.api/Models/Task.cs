using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Eventing.Reader;

namespace Taskly.api.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        public required string Name {  get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? DateCompleted { get; set; }
        public bool IsImportant { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime DateCreated { get; set; }
        public int PriorityId { get; set; }

        public Priority? Priority { get; set; }
    }
}
