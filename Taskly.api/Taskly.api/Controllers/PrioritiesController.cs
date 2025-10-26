using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskly.api.Data;
using Taskly.api.Data.Interfaces;
using Taskly.api.Data.Repositories;

namespace Taskly.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioritiesController : Controller
    {
        private readonly IPriorityRepository priorityRepo;

        public PrioritiesController(IPriorityRepository priorityRepository)
        {
            this.priorityRepo = priorityRepository;
        }

        [HttpGet]
        public IActionResult getPriorities()
        {
            var priorities = priorityRepo.GetAllPriorities().ToList();

            return Ok(priorities);
        }
    }
}
