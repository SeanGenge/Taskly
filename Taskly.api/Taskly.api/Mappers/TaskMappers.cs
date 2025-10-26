using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Taskly.api.Models;

namespace Taskly.api.Mappers
{
    public static class TaskMappers
    {
        public static TaskDTO ToTaskDTO(this api.Models.Task taskModel)
        {
            return new TaskDTO
            {
                Id = taskModel.Id,
                Name = taskModel.Name,
                Description = taskModel.Description,
                DateCompleted = taskModel.DateCompleted,
                DateCreated = taskModel.DateCreated,
                DueDate = taskModel.DueDate,
                IsCompleted = taskModel.IsCompleted,
                IsImportant = taskModel.IsImportant,
                PriorityId = taskModel.PriorityId,
            };
        }

        public static api.Models.Task ToTask(this TaskDTO taskDTO)
        {
            return new api.Models.Task
            {
                Id = taskDTO.Id,
                Name = taskDTO?.Name ?? "",
                Description = taskDTO?.Description ?? "",
                DateCompleted = taskDTO?.DateCompleted ?? null,
                DueDate = taskDTO?.DueDate ?? null,
                IsCompleted = taskDTO?.IsCompleted ?? false,
                IsImportant = taskDTO?.IsImportant ?? false,
                PriorityId = taskDTO?.PriorityId ?? 1,
            };
        }
    }
}
