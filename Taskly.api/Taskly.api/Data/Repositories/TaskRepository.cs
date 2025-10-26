using Microsoft.EntityFrameworkCore;
using Taskly.api.Data.Interfaces;
using Taskly.api.Models;

namespace Taskly.api.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TasklyDbContext _context;

        public TaskRepository(TasklyDbContext context)
        {
            _context = context;
        }

        public List<api.Models.Task> GetAllTasks()
        {
            var tasks = _context.Tasks.ToList();

            return tasks;
        }

        public async Task<api.Models.Task> AddTask(api.Models.Task task)
        {
            try
            {
                // Set the date when the item was created
                task.DateCreated = DateTime.Now;

                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();

                return task;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public api.Models.Task? UpdateTask(int id, api.Models.Task task)
        {
            // Attempt to find the item
            var taskToEdit = _context.Tasks.Where(t => t.Id == id).FirstOrDefault();

            if (taskToEdit != null)
            {
                taskToEdit.Name = task.Name;
                taskToEdit.Description = task.Description;
                taskToEdit.DueDate = task.DueDate;
                taskToEdit.DateCompleted = task.DateCompleted;
                taskToEdit.IsCompleted = task.IsCompleted;
                taskToEdit.IsImportant = task.IsImportant;

                // Just check that priority id is a valid id before updating
                if (_context.Priorities.Any(i => i.Id == task.PriorityId))
                {
                    taskToEdit.PriorityId = task.PriorityId;
                }

                _context.SaveChanges();

                return taskToEdit;
            }

            return null;
        }

        public bool DeleteTask(int taskId)
        {
            var task = _context.Tasks.Where(t => t.Id == taskId).FirstOrDefault();

            if (task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();

                return true;
            }

            // Task not found
            return false;
        }
    }
}
