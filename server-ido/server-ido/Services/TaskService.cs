using server_ido.Contextes;
using server_ido.Models;
using Microsoft.EntityFrameworkCore;
namespace server_ido.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskContext _context;
        public TaskService(TaskContext context)
        {
            _context = context;
        }

        public async Task<string> CreateTask(Models.Task task)
        {
            try
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
                return "True";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public async Task<string> UpdateTask(Models.Task task)
        {
            try
            {
                var existingTask = await _context.Tasks.FindAsync(task.TaskId);

                if (existingTask == null)
                {
                    return "Task not found";
                }

                existingTask.Title = task.Title;
                existingTask.Category = task.Category;
                existingTask.DueDate = task.DueDate;
                existingTask.Estimate = task.Estimate;
                existingTask.Importance = task.Importance;
                existingTask.Status = task.Status;

                await _context.SaveChangesAsync();

                return "True";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public async Task<IEnumerable<Models.Task>> GetUserTasks(User user)
        {
            try
            {
                var tasks = await _context.Tasks
                    .Where(task => task.UserId == user.UserId)
                    .OrderByDescending(task => task.TaskId)
                    .ToListAsync();
                return tasks;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
