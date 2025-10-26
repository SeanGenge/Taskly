using Taskly.api.Data.Interfaces;
using Taskly.api.Models;

namespace Taskly.api.Data.Repositories
{
    public class PriorityRepository : IPriorityRepository
    {
        private readonly TasklyDbContext _context;

        public PriorityRepository(TasklyDbContext context)
        {
            _context = context;
        }

        public List<Priority> GetAllPriorities()
        {
            var priorities = _context.Priorities.ToList();

            return priorities;
        }
    }
}
