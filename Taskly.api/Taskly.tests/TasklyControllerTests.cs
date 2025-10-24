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
        //[Fact]
        //public void GetAllTasks_ShouldReturnOk_WithAllItems()
        //{
        //    // Arrange
        //    var options = new DbContextOptionsBuilder<TasklyDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
        //    var tasklyDbContext = new TasklyDbContext(options);

        //    tasklyDbContext.TodoItems.AddRange(
        //        new Task { Id = Guid.NewGuid(), Description = "A" },
        //        new Task { Id = Guid.NewGuid(), Description = "B" }
        //    );

        //    tasklyDbContext.SaveChanges();

        //    var controller = new TasklyController(tasklyDbContext);

        //    // Act
        //    var actionResult = controller.GetAllTasks();

        //    // Assert
        //    var result = actionResult as OkObjectResult;
        //    var items = result?.Value as IEnumerable<api.Models.Task>;
        //    var ok = Assert.IsType<OkObjectResult>(result);

        //    // The list contains two items
        //    Assert.Equal(2, items?.Count());
        //    // Checking if the list contain the correct items
        //    Assert.Contains(items, x => x.Description == "A");
        //    Assert.Contains(items, x => x.Description == "B");
        //    // Unique Ids
        //    Assert.Equal(items.Count(), items.Select(i => i.Id).Distinct().Count());
        //}

        //    [Fact]
        //    public void Addtask_ShouldReturnOk_WithAddedItem()
        //    {
        //        // Arrange
        //        var options = new DbContextOptionsBuilder<TasklyDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
        //        var tasklyDbContext = new TasklyDbContext(options);
        //        var controller = new TasklyController(tasklyDbContext);

        //        // Act
        //        var item = new AddTaskRequestDTO
        //        {
        //            Description = "foo",
        //        };

        //        var actionResult = controller.AddTask(item);

        //        // Assert
        //        var result = actionResult as OkObjectResult;
        //        var itemData = result?.Value as api.Models.Task;
        //        var ok = Assert.IsType<OkObjectResult>(result);

        //        // Checking if the list contain the correct items
        //        Assert.Equal("foo", item.Description);
        //    }

        //    [Fact]
        //    public void Addtask_ShouldReturnBadRequest_WhenBlankDescription()
        //    {
        //        // Arrange
        //        var options = new DbContextOptionsBuilder<TasklyDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
        //        var tasklyDbContext = new TasklyDbContext(options);
        //        var controller = new TasklyController(tasklyDbContext);

        //        // Act
        //        var item = new AddTaskRequestDTO
        //        {
        //            Description = "",
        //        };

        //        var actionResult = controller.AddTask(item);

        //        // Assert
        //        Assert.IsType<BadRequestResult>(actionResult);
        //        Assert.Empty(tasklyDbContext.TodoItems);
        //    }

        //    [Fact]
        //    public void Deletetask_ShouldReturnOk_WithDeletedItem()
        //    {
        //        // Arrange
        //        var options = new DbContextOptionsBuilder<TasklyDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
        //        var tasklyDbContext = new TasklyDbContext(options);
        //        var controller = new TasklyController(tasklyDbContext);

        //        var guid = Guid.NewGuid();

        //        // Act
        //        tasklyDbContext.TodoItems.AddRange(
        //            new Task { Id = guid, Description = "A" }
        //        );

        //        tasklyDbContext.SaveChanges();

        //        var actionResult = controller.DeleteTask(guid);

        //        // Assert
        //        Assert.IsType<OkObjectResult>(actionResult);
        //        Assert.Empty(tasklyDbContext.TodoItems);
        //    }
    }
}
