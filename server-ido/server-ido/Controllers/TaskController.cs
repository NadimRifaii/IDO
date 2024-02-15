using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_ido.Models;
using server_ido.Services;

namespace server_ido.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITaskService _taskService;

        public TaskController(IAuthService authService, ITaskService taskService, IHttpContextAccessor httpContextAccessor)
        {
            _authService = authService;
            _taskService = taskService;
            _httpContextAccessor = httpContextAccessor;
        }

        private async Task<User> GetCurrentUserAsync()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var authorizationHeader = httpContext.Request.Headers["Authorization"].ToString();

            if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return null;
            }

            var token = authorizationHeader.Substring("Bearer ".Length);
            var currentUser = await _authService.GetCurrentAuthenticatedUser(token);
            return currentUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserTasks()
        {
            var currentUser = await GetCurrentUserAsync();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            var userTasks = await _taskService.GetUserTasks(currentUser);
            var response = new { tasks = userTasks, user = currentUser };
            return Ok(response);
        }
        [HttpPost("createTask")]
        public async Task<IActionResult> CreateTask(Models.Task task)
        {
            var currentUser = await GetCurrentUserAsync();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            task.UserId = currentUser.UserId;
            var result = await _taskService.CreateTask(task);
            var userTasks = await _taskService.GetUserTasks(currentUser);
            var response = new { tasks = userTasks, user = currentUser };
            if (result != "True")
            {
                return BadRequest(result);
            }
            return Ok(response);
        }

        [HttpPut("updateTask")]
        public async Task<IActionResult> UpdateTask(Models.Task task)
        {
            var currentUser = await GetCurrentUserAsync();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            var result = await _taskService.UpdateTask(task);
            if (result != "True")
            {
                return BadRequest(result);
            }
            return Ok("Task was updated successfully");
        }
    }
}
