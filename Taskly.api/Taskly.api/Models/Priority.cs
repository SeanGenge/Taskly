using System.ComponentModel.DataAnnotations;

namespace Taskly.api.Models
{
    public class Priority
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        // Used to determine the level of priority
        public required int PriorityLevel { get; set; }
        public virtual List<Task>? Tasks { get; set; }
    }
}
