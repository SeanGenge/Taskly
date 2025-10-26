using Microsoft.AspNetCore.Mvc;
using Taskly.api.Data;
using Taskly.api.Data.Interfaces;
using Taskly.api.Mappers;
using Taskly.api.Models;

namespace Taskly.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        private readonly ITaskRepository taskRepo;

        public TasksController(ITaskRepository taskRepository)
        {
            this.taskRepo = taskRepository;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            try
            {
                // Retrieve the items from the dbContext
                var todoItems = taskRepo.GetAllTasks().Select(t => t.ToTaskDTO());

                return Ok(todoItems);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] TaskDTO newTask)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await taskRepo.AddTask(newTask.ToTask());

                    return StatusCode(201, result.ToTaskDTO());
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                var result = taskRepo.DeleteTask(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDTO task)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await taskRepo.UpdateTask(id, task.ToTask());

                    return Ok(result?.ToTaskDTO());
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
