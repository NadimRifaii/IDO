using server_ido.Models;

namespace server_ido.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Models.Task>> GetUserTasks(User user);
        Task<string> CreateTask(Models.Task task);
        Task<string> UpdateTask(Models.Task task);
    }
}
