using Microsoft.AspNetCore.Mvc;
using Taskly.api.Data;
using Taskly.api.Models;

namespace Taskly.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasklyController : Controller
    {
        private readonly TasklyDbContext dbContext;

        public TasklyController(TasklyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            // Retrieve the items from the dbContext
            var todoItems = dbContext.TodoItems.ToList();

            return Ok(todoItems);
        }

        [HttpPost]
        public IActionResult AddTask(AddTaskRequestDTO request)
        {
            if (string.IsNullOrWhiteSpace(request.Description)) return BadRequest();

            // Create a new Todo item
            var domainModelTask = new TodoItem
            {
                Id = Guid.NewGuid(),
                Description = request.Description,
            };

            // Save the todo item to the in memory db and save changes
            dbContext.TodoItems.Add(domainModelTask);
            dbContext.SaveChanges();

            return Ok(domainModelTask);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteTask(Guid id)
        {
            var item = dbContext.TodoItems.Find(id);
            if (item is null)
                // Item is not found
                return NotFound();

            // Remove item
            dbContext.TodoItems.Remove(item);
            dbContext.SaveChanges();

            return Ok(item);
        }
    }
}
