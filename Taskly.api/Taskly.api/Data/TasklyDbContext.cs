using Microsoft.EntityFrameworkCore;
using Taskly.api.Models;

namespace Taskly.api.Data
{
    public class TasklyDbContext : DbContext
    {
        public TasklyDbContext(DbContextOptions<TasklyDbContext> options) : base(options)
        {
            
        }

        public DbSet<Models.Task> Tasks { get; set; }
        public DbSet<Priority> Priorities { get; set; }
    }
}
