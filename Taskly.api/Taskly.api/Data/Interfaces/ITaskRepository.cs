using Taskly.api.Models;

namespace Taskly.api.Data.Interfaces
{
    public interface ITaskRepository
    {
        List<api.Models.Task> GetAllTasks();
        Task<api.Models.Task> AddTask(api.Models.Task task);
        Task<api.Models.Task?> UpdateTask(int id, api.Models.Task task);
        bool DeleteTask(int taskId);
    }
}
