using Taskly.api.Models;

namespace Taskly.api.Data.Interfaces
{
    public interface IPriorityRepository
    {
        List<Priority> GetAllPriorities();
    }
}
