using Microsoft.EntityFrameworkCore;
using Taskly.api.Models;

namespace Taskly.api.Data
{
    public class TasklyDbContext : DbContext
    {
        public TasklyDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
