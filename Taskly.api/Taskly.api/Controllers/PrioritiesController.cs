using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskly.api.Data;

namespace Taskly.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioritiesController : Controller
    {
        private readonly TasklyDbContext dbContext;

        public PrioritiesController(TasklyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getPriorities()
        {
            var priorities = dbContext.Priorities.ToList();

            return Ok(priorities);
        }
    }
}
