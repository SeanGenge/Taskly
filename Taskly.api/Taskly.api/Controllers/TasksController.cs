using Microsoft.AspNetCore.Mvc;
using Taskly.api.Data;
using Taskly.api.Models;

namespace Taskly.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        private readonly TasklyDbContext dbContext;

        public TasksController(TasklyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            // Retrieve the items from the dbContext
            var todoItems = dbContext.Tasks.ToList();

            return Ok(todoItems);
        }

        [HttpPost]
        public IActionResult AddTask(TaskDTO request)
        {
            if (string.IsNullOrWhiteSpace(request.Name)) return BadRequest();

            int firstPriotityId = dbContext.Priorities.First().Id;

            try
            {
                // Create a new Todo item
                var domainModelTask = new Models.Task
                {
                    Name = request.Name,
                    Description = request.Description,
                    IsCompleted = false,
                    DateCreated = DateTime.Now,
                    DueDate = request?.DueDate,
                    IsImportant = request?.IsImportant ?? false,
                    PriorityId = request?.PriorityId ?? firstPriotityId,
                };

                // Save the todo item to the in memory db and save changes
                dbContext.Tasks.Add(domainModelTask);
                dbContext.SaveChanges();

                TaskDTO response = new TaskDTO
                {
                    Id = domainModelTask.Id,
                    Name = domainModelTask.Name,
                    Description = domainModelTask.Description,
                    IsCompleted = domainModelTask.IsCompleted,
                    DueDate = domainModelTask.DueDate,
                    DateCreated = domainModelTask.DateCreated,
                    IsImportant = domainModelTask.IsImportant,
                    PriorityId = domainModelTask.PriorityId
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteTask(int id)
        {
            var item = dbContext.Tasks.Find(id);
            if (item is null)
                // Item is not found
                return NotFound();

            try
            {
                // Remove item
                dbContext.Tasks.Remove(item);
                dbContext.SaveChanges();

                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Patch(int id, [FromBody] TaskDTO dto)
        {
            try
            {
                // Attempt to find the item
                var item = await dbContext.Tasks.FindAsync(id);
                if (item is null) return NotFound();

                // Check which fields needs to be updated and update accordingly
                if (!string.IsNullOrWhiteSpace(dto.Name)) item.Name = dto.Name;
                if (dto.Description is not null) item.Description = dto.Description;
                if (dto.DueDate.HasValue) item.DueDate = dto.DueDate.Value;
                if (dto.DateCompleted.HasValue) item.DateCompleted = dto.DateCompleted.Value;
                if (dto.IsCompleted.HasValue)
                {
                    item.IsCompleted = dto.IsCompleted.Value;
                    // Also set the completion date
                    item.DateCompleted = DateTime.Now;
                }
                if (dto.IsImportant.HasValue) item.IsImportant = dto.IsImportant.Value;

                // Just check that priority id is a valid id
                if (dbContext.Priorities.Any(i => i.Id == dto.PriorityId))
                {
                    item.PriorityId = dto?.PriorityId ?? dbContext.Priorities.First().Id;
                }

                await dbContext.SaveChangesAsync();
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
