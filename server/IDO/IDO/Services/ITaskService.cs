using IDO.Models;
using Microsoft.AspNetCore.Identity;

namespace IDO.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Models.Task>> GetUserTasks(User user);
        Task<string> CreateTask(Models.Task task);
        Task<string> UpdateTask(Models.Task task);
    }
}
