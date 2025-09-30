using Microsoft.AspNetCore.Mvc;
using Taskly.api.Data;

namespace Taskly.api.Controllers
{
    public class TodoController : Controller
    {
        private readonly TasklyDbContext dbContext;

        public TodoController(TasklyDbContext dbContext)
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
    }
}
