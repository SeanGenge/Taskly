namespace Taskly.api.Models
{
    public class TodoItem
    {
        public Guid Id { get; set; }
        public required string Description { get; set; }
    }
}
