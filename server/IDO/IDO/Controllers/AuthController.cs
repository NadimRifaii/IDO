using IDO.Models;
using IDO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User user)
        {
            var result=await _authService.Signup(user);
            if (result == true)
            {
                var tokenString = _authService.GenerateTokenString(user);
                var returnedUser = new { email = user.Email, userName = user.UserName };
                var response = new { token = tokenString,currentUser=returnedUser }; 
                return Ok(response);
            }
            return BadRequest();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            var currentUser = await _authService.Login(user);
            if (currentUser!=null)
            {
                var tokenString = _authService.GenerateTokenString(user);
                var returnedUser = new { email = currentUser.Email, userName = currentUser.UserName };
                var response = new { token = tokenString,currentUser=returnedUser };
                return Ok(response);
            }
            return BadRequest();
        }

    }
}
