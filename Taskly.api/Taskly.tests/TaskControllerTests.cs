using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskly.api.Controllers;
using Taskly.api.Data;
using Taskly.api.Models;
using Microsoft.Data.Sqlite;
using Moq;
using Taskly.api.Data.Interfaces;
using AutoFixture;
using System.Threading.Tasks;
using Taskly.api.Mappers;

namespace Taskly.tests
{
    public class TaskControllerTests
    {
        private Mock<ITaskRepository> _taskRepository;
        private Fixture _fixture;
        private TasksController _controller;

        public TaskControllerTests()
        {
            _fixture = new Fixture();
            _taskRepository = new Mock<ITaskRepository>();

            // Prevents circular dependency when using fixture due to model navigation properties
            // This is required as it will keep trying to fill out the whole graph as models reference each other
            _fixture.Customize<Taskly.api.Models.Priority>(c => c.Without(p => p.Tasks));
        }

        [Fact]
        public void Get_AllTasks_ReturnOk()
        {
            var taskList = _fixture.CreateMany<api.Models.Task>(3).ToList();

            _taskRepository.Setup(repo => repo.GetAllTasks()).Returns(taskList);
            _controller = new TasksController(_taskRepository.Object);

            // Asserts
            var result = _controller.GetAllTasks();
            var obj = result as ObjectResult;

            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async System.Threading.Tasks.Task Add_Task_ReturnOk()
        {
            var newTask = _fixture.Create<api.Models.Task>();

            _taskRepository.Setup(repo => repo.AddTask(It.IsAny<api.Models.Task>())).Returns(System.Threading.Tasks.Task.FromResult(newTask));
            _controller = new TasksController(_taskRepository.Object);

            // Asserts
            var result = await _controller.AddTask(newTask.ToTaskDTO());
            var obj = result as ObjectResult;

            Assert.Equal(201, obj.StatusCode);
        }

        [Fact]
        public async System.Threading.Tasks.Task AddTask_MissingName_ReturnBadRequest()
        {
            var invalidDTO = _fixture.Build<TaskDTO>()
                                  .With(t => t.Name, string.Empty)
                                  .Create();

            _controller = new TasksController(_taskRepository.Object);
            _controller.ModelState.AddModelError("Name", "The Name field cannot be empty.");

            // Asserts
            var result = await _controller.AddTask(invalidDTO);
            var obj = result as BadRequestResult;
             
            Assert.Equal(400, obj.StatusCode);
            _taskRepository.Verify(repo => repo.AddTask(It.IsAny<api.Models.Task>()), Moq.Times.Never());
        }

        [Fact]
        public async System.Threading.Tasks.Task Update_Task_ReturnOk()
        {
            var newTask = _fixture.Create<api.Models.Task>();

            _taskRepository.Setup(repo => repo.AddTask(It.IsAny<api.Models.Task>())).Returns(System.Threading.Tasks.Task.FromResult(newTask));
            _controller = new TasksController(_taskRepository.Object);

            // Asserts
            var result = await _controller.UpdateTask(newTask.Id, newTask.ToTaskDTO());
            var obj = result as ObjectResult;

            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public void Delete_Task_ReturnOk()
        {
            var newTask = _fixture.Create<api.Models.Task>();

            _taskRepository.Setup(repo => repo.DeleteTask(It.IsAny<int>())).Returns(It.IsAny<bool>());
            _controller = new TasksController(_taskRepository.Object);

            // Asserts
            var result = _controller.DeleteTask(newTask.Id);
            var obj = result as ObjectResult;

            Assert.Equal(200, obj.StatusCode);
        }
    }
}
