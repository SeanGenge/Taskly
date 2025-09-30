using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskly.api.Controllers;
using Taskly.api.Data;
using Taskly.api.Models;

namespace Taskly.tests
{
    public class TasklyControllerTests
    {
        [Fact]
        public void GetAllTasks_ShouldReturnOk_WithAllItems()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TasklyDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;

            using var tasklyDbContext = new TasklyDbContext(options);

            tasklyDbContext.TodoItems.AddRange(
                new TodoItem { Id = Guid.NewGuid(), Description = "A" },
                new TodoItem { Id = Guid.NewGuid(), Description = "B" }
            );

            tasklyDbContext.SaveChanges();

            var controller = new TodoController(tasklyDbContext);

            // Act
            var actionResult = controller.GetAllTasks();

            // Assert
            var result = actionResult as OkObjectResult;
            var items = result.Value as IEnumerable<TodoItem>;
            var ok = Assert.IsType<OkObjectResult>(result);

            Assert.Equal(200, ok.StatusCode);
            // The list contains two items
            Assert.Equal(2, items.Count());
            // Checking if the list contain the correct items
            Assert.Contains(items, x => x.Description == "A");
            Assert.Contains(items, x => x.Description == "B");
            // Unique Ids
            Assert.Equal(items.Count(), items.Select(i => i.Id).Distinct().Count());
        }
    }
}
